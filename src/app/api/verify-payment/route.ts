import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Insert payment record
    const { error: paymentError } = await supabase.from("payments").insert({
      user_id: user.id,
      amount: 19900,
      currency: "INR",
      razorpay_payment_id,
      razorpay_order_id,
      status: "captured",
    });

    if (paymentError) {
      console.error("Payment insert error:", paymentError);
      return NextResponse.json({ error: "Failed to save payment" }, { status: 500 });
    }

    // Insert subscription record (mocking 30 days)
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30);

    const { error: subError } = await supabase.from("subscriptions").insert({
      user_id: user.id,
      plan: "pro",
      status: "active",
      current_period_end: currentPeriodEnd.toISOString(),
    });

    if (subError) {
      console.error("Subscription insert error:", subError);
      return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
    }

    // Update user plan type
    const { error: userError } = await supabase
      .from("users")
      .update({ plan_type: "pro" })
      .eq("id", user.id);

    if (userError) {
      console.error("User update error:", userError);
      return NextResponse.json({ error: "Failed to upgrade user plan" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
