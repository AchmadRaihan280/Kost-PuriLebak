import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();
  const { order_id, transaction_status } = body;

  try {
    const q = query(
      collection(db, "pemesanan"),
      where("orderId", "==", order_id)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json({ message: "Order ID tidak ditemukan" });
    }

    const bookingDoc = snapshot.docs[0];
    const ref = doc(db, "pemesanan", bookingDoc.id);

    let newStatus = "Menunggu Pembayaran";
    if (transaction_status === "settlement") newStatus = "Dikonfirmasi";
    else if (transaction_status === "expire" || transaction_status === "cancel")
      newStatus = "Dibatalkan";

    await updateDoc(ref, { status: newStatus });

    return NextResponse.json({ message: "Status berhasil diperbarui" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
