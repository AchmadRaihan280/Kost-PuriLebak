import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.re_g6rHAMJB_JV98EGNRxVBDkXKGw6x2sLLE);

export async function POST(req: Request) {
  try {
    const { nama, email, pesan } = await req.json();

    await resend.emails.send({
      from: "onboarding@resend.dev", // default domain gratis dari Resend
      to: "cupetonglabrador@gmail.com", // ganti dengan email kamu yang aktif
      subject: `Pesan Baru dari ${nama}`,
      html: `
    <h2>Pesan Baru dari Website</h2>
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Pesan:</strong></p>
    <p>${pesan}</p>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
