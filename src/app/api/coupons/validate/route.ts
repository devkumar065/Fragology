import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/data/coupons";

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal = 0 } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, message: "Please provide a coupon code." },
        { status: 400 }
      );
    }

    const result = validateCoupon(code, Number(subtotal));
    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Coupon evaluation error";
    return NextResponse.json({ valid: false, message: msg }, { status: 500 });
  }
}
