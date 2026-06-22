import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { createClient } from "@/utils/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Razorpay amount is in paise (1 INR = 100 paise)
    const amount = 199 * 100;
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: `receipt_${user.id}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
