import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, grossAmount, customerName, customerEmail, customerPhone } =
      body;

    if (!orderId || !grossAmount) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

    if (!serverKey) {
      return NextResponse.json(
        { error: "MIDTRANS_SERVER_KEY is missing" },
        { status: 500 }
      );
    }

    const midtransUrl = isProduction
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";

    const response = await fetch(midtransUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
          "base64"
        )}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        customer_details: {
          first_name: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Midtrans error", detail: data },
        { status: response.status }
      );
    }

    return NextResponse.json({ token: data.token });
  } catch (error) {
    console.error("❌ Midtrans API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
