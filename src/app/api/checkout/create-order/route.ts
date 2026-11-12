import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";
import { validateCoupon } from "@/data/coupons";
import { Order } from "@/types/order";
import { CartItem } from "@/types/cart";
import { CustomerAddress } from "@/types/customer";
import { PaymentProvider } from "@/types/payment";
import { getPaymentAdapter } from "@/lib/payment";
import { saveOrder } from "@/lib/orders-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      items,
      couponCode,
      shippingAddress,
      billingAddress,
      customerEmail,
      customerName,
      customerPhone,
      paymentProvider = "stripe",
      userId,
      specialInstructions,
    }: {
      items: Array<{ productId: string; variantSize: string; quantity: number }>;
      couponCode?: string;
      shippingAddress: CustomerAddress;
      billingAddress?: CustomerAddress;
      customerEmail: string;
      customerName: string;
      customerPhone?: string;
      paymentProvider: PaymentProvider;
      userId?: string;
      specialInstructions?: string;
    } = body;

    // 1. Validation: customer & shipping address
    if (!customerEmail || !customerName || !shippingAddress || !shippingAddress.streetAddress1) {
      return NextResponse.json(
        { error: "Incomplete client information or shipping destination." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your fragrance shopping bag is empty." },
        { status: 400 }
      );
    }

    // 2. Authoritative Recalculation: never trust client unit prices
    let authoritativeSubtotal = 0;
    const verifiedOrderItems: CartItem[] = [];

    for (const line of items) {
      const product = PRODUCTS.find((p) => p.id === line.productId || p.slug === line.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Fragrance with ID "${line.productId}" could not be authenticated in the catalog.` },
          { status: 400 }
        );
      }

      const variant = product.variants.find((v) => v.size === line.variantSize) || product.variants[product.variants.length - 1];
      const quantity = Math.max(1, Math.floor(line.quantity || 1));
      const unitPrice = variant.priceNum;
      authoritativeSubtotal += unitPrice * quantity;

      verifiedOrderItems.push({
        id: `${product.id}-${variant.size}`,
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        productSubtitle: product.subtitle,
        variantSize: variant.size,
        volumeDisplay: variant.volumeDisplay,
        concentration: product.concentration,
        priceNum: unitPrice,
        priceDisplay: variant.price,
        quantity,
        accentColor: product.accentColor,
      });
    }

    authoritativeSubtotal = Math.round(authoritativeSubtotal * 100) / 100;

    // 3. Coupon Re-validation
    let authoritativeDiscount = 0;
    let validatedCouponCode: string | null = null;

    if (couponCode) {
      const couponResult = validateCoupon(couponCode, authoritativeSubtotal);
      if (couponResult.valid) {
        authoritativeDiscount = couponResult.discountAmount;
        validatedCouponCode = couponResult.coupon?.code || couponCode.toUpperCase();
      }
    }

    // 4. Shipping & Tax Calculation
    const shippingFee = authoritativeSubtotal >= 1999 ? 0 : 99;
    const taxableAmount = Math.max(0, authoritativeSubtotal - authoritativeDiscount);
    const taxAmount = Math.round(taxableAmount * 0.08 * 100) / 100;
    const grandTotal = Math.round((authoritativeSubtotal - authoritativeDiscount + shippingFee + taxAmount) * 100) / 100;

    // 5. Generate Sequential Order Number: FRG-YYYYMMDD-XXXX
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `FRG-${dateStr}-${randomSuffix}`;

    // 6. Build Order Object
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: userId || null,
      customerEmail: customerEmail.trim().toLowerCase(),
      customerName: customerName.trim(),
      customerPhone,
      status: "confirmed",
      paymentStatus: paymentProvider === "concierge_transfer" ? "processing" : "pending",
      paymentProvider,
      currency: "INR",
      subtotal: authoritativeSubtotal,
      discountAmount: authoritativeDiscount,
      shippingFee,
      taxAmount,
      totalAmount: grandTotal,
      couponCode: validatedCouponCode,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      items: verifiedOrderItems,
      shippingCarrier: "DHL Express Luxury Network",
      trackingNumber: `TRK-${orderNumber.replace(/[^a-zA-Z0-9]/g, "")}`,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      specialInstructions,
      createdAt: now.toISOString(),
      statusHistory: [
        {
          status: "confirmed",
          note: "Commission created and confirmed at Paris Atelier.",
          timestamp: `${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} - ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} GMT`,
          location: "Maison Fragology Atelier, Paris",
        },
      ],
    };

    // 7. Initialize Payment Intent via Gateway Adapter
    const paymentAdapter = getPaymentAdapter(paymentProvider);
    const paymentInit = await paymentAdapter.createPaymentIntent({ order: newOrder });

    // Save order to store
    saveOrder(newOrder);

    return NextResponse.json({
      success: true,
      orderNumber,
      totalAmount: grandTotal,
      currency: "INR",
      payment: paymentInit,
      order: newOrder,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal order creation error";
    console.error("[Create Order Exception]:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
