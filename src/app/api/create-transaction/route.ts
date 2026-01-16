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

    // 🔑 Ambil Server Key dari .env.local
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error("❌ MIDTRANS_SERVER_KEY tidak ditemukan di .env.local");
      return NextResponse.json(
        { error: "Server key not found" },
        { status: 500 }
      );
    }

    // 🔹 Midtrans API URL (sandbox)
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/v1/transactions";

    // 🔹 Kirim request ke Midtrans API
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
    console.log("📦 Midtrans Response:", data);

    // Jika gagal (misalnya salah key atau salah request)
    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message || "Gagal membuat transaksi ke Midtrans",
          detail: data,
        },
        { status: response.status }
      );
    }

    // ✅ Return token ke frontend
    return NextResponse.json({ token: data.token });
  } catch (err) {
    console.error("❌ Error di API Midtrans:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
