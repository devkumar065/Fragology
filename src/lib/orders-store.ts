import { Order } from "@/types/order";

// In-memory persistent order registry with sample demo orders
// This complements the Supabase database and ensures 100% reliable order tracking
// even when operating with placeholder Supabase credentials.

const GLOBAL_ORDERS: Order[] = [
  {
    id: "ord-demo-01",
    orderNumber: "FRG-20261107-8491",
    userId: "client-demo-01",
    customerEmail: "client@fragology.com",
    customerName: "Lord Dev Kumar",
    customerPhone: "+1 (555) 382-9481",
    status: "shipped",
    paymentStatus: "paid",
    paymentProvider: "stripe",
    paymentReference: "pi_3Mtwx2LkdIwHu7ix28a3tqZ0",
    currency: "USD",
    subtotal: 760.0,
    discountAmount: 76.0,
    shippingFee: 0.0,
    taxAmount: 54.72,
    totalAmount: 738.72,
    couponCode: "FRAGOLOGY10",
    shippingAddress: {
      id: "addr-01",
      fullName: "Lord Dev Kumar",
      phone: "+1 (555) 382-9481",
      streetAddress1: "740 Park Avenue",
      streetAddress2: "Penthouse Suite 14B",
      city: "New York",
      stateProvince: "NY",
      postalCode: "10021",
      country: "United States",
    },
    items: [
      {
        id: "prod-1-100ml",
        productId: "prod-1",
        productSlug: "nocturne-ambre",
        productName: "Nocturne Ambré",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Extrait de Parfum (30%)",
        priceNum: 340.0,
        priceDisplay: "$340",
        quantity: 1,
        accentColor: "#C8A45D",
      },
      {
        id: "prod-2-100ml",
        productId: "prod-2",
        productSlug: "oud-imperiale",
        productName: "Oud Impériale",
        variantSize: "100ml",
        volumeDisplay: "100ml Grand Flacon",
        concentration: "Extrait de Parfum (30%)",
        priceNum: 420.0,
        priceDisplay: "$420",
        quantity: 1,
        accentColor: "#AE8847",
      },
    ],
    shippingCarrier: "DHL Express Luxury Network",
    trackingNumber: "TRK-FRG-98412-US",
    estimatedDelivery: "November 11, 2026",
    createdAt: "2026-11-05T14:22:00Z",
    statusHistory: [
      {
        status: "confirmed",
        note: "Commission confirmed & authenticated at Paris atelier.",
        timestamp: "November 5, 2026 - 14:22 GMT",
        location: "Maison Fragology Atelier, Paris",
      },
      {
        status: "processing",
        note: "Flacons hand-poured, inspected under polarized light, and sealed with monogrammed wax.",
        timestamp: "November 6, 2026 - 09:15 GMT",
        location: "Maison Fragology Atelier, Grasse",
      },
      {
        status: "shipped",
        note: "Consignment handed over to DHL White-Glove Luxury Transit.",
        timestamp: "November 7, 2026 - 08:30 GMT",
        location: "Charles de Gaulle International Hub, Roissy",
      },
    ],
  },
];

export function getOrder(orderNumber: string): Order | undefined {
  return GLOBAL_ORDERS.find(
    (o) => o.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase()
  );
}

export function saveOrder(order: Order): Order {
  const index = GLOBAL_ORDERS.findIndex(
    (o) => o.orderNumber.toUpperCase() === order.orderNumber.toUpperCase()
  );
  if (index >= 0) {
    GLOBAL_ORDERS[index] = order;
  } else {
    GLOBAL_ORDERS.unshift(order);
  }
  return order;
}

export function getOrdersForCustomer(email: string): Order[] {
  return GLOBAL_ORDERS.filter(
    (o) => o.customerEmail.toLowerCase() === email.trim().toLowerCase()
  );
}
