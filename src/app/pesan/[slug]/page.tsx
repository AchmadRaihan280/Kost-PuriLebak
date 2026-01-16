/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Image from "next/image";
import Link from "next/link";

// 🧩 Deklarasi global untuk Midtrans Snap agar tidak error di TypeScript
declare global {
  interface Window {
    snap: any;
  }
}

interface Room {
  id: string;
  nama: string;
  tipe: string;
  harga: string;
  gambar: string[];
}

export default function FormPemesananPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [nama, setNama] = useState("");
  const [nomorHP, setNomorHP] = useState("");
  const [email, setEmail] = useState("");
  const [lamaSewa, setLamaSewa] = useState("1 Bulan");
  const [metodeBayar, setMetodeBayar] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchRoom = async () => {
      try {
        const docRef = doc(db, "rooms", slug as string);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setRoom({
            id: snapshot.id,
            ...snapshot.data(),
          } as Room);
        } else {
          setRoom(null);
        }
      } catch (error) {
        console.error("❌ Gagal mengambil data kamar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat data kamar...
      </main>
    );
  }

  if (!room) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-gray-700">Kamar tidak ditemukan.</h2>
      </main>
    );
  }

  // 💰 Konversi harga & total sewa
  const hargaPerBulan = Number(room.harga);
  const getLamaSewaNumber = () => {
    if (lamaSewa === "3 Bulan") return 3;
    if (lamaSewa === "6 Bulan") return 6;
    if (lamaSewa === "12 Bulan") return 12;
    return 1;
  };
  const totalHarga = hargaPerBulan * getLamaSewaNumber();

  // 🧾 Fungsi untuk handle transaksi Midtrans
  const handlePemesanan = async () => {
    if (!nama || !nomorHP || !email || !tanggalMasuk || !metodeBayar) {
      alert("Harap lengkapi semua data terlebih dahulu!");
      return;
    }

    const orderId = `ORDER-${Date.now()}`;

    try {
      // 🧩 1. Simpan data ke Firestore dulu
      const pemesananRef = collection(db, "pemesanan");
      await addDoc(pemesananRef, {
        orderId,
        nama,
        nomorHP,
        email,
        tanggalMasuk,
        lamaSewa,
        metodeBayar,
        kamar: room?.nama,
        tipe: room?.tipe,
        harga: room?.harga,
        totalHarga,
        status: "Menunggu Pembayaran",
        createdAt: new Date(),
      });

      console.log("✅ Data pemesanan berhasil disimpan ke Firestore");

      // 🧾 2. Kirim request ke API Midtrans
      const response = await fetch("/api/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          grossAmount: totalHarga,
          customerName: nama,
          customerEmail: email,
          customerPhone: nomorHP,
        }),
      });

      const data = await response.json();
      console.log("Midtrans response:", data);

      if (!data.token) {
        alert("Gagal membuat transaksi.");
        return;
      }

      // 🧩 3. Tambahkan script Snap
      const snapScript = document.createElement("script");
      snapScript.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      snapScript.setAttribute(
        "data-client-key",
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
      );
      document.body.appendChild(snapScript);

      snapScript.onload = () => {
        window.snap.pay(data.token, {
          onSuccess: (result: any) => {
            alert("✅ Pembayaran berhasil!");
            console.log(result);
          },
          onPending: (result: any) => {
            alert("⌛ Menunggu pembayaran...");
            console.log(result);
          },
          onError: (result: any) => {
            alert("❌ Terjadi kesalahan saat pembayaran.");
            console.log(result);
          },
          onClose: () => {
            alert("❗ Kamu menutup popup tanpa menyelesaikan pembayaran.");
          },
        });
      };
    } catch (error) {
      console.error("Gagal memproses transaksi:", error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <Link
        href={`/daftar-kamar/${slug}`}
        className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 mb-6"
      >
        ← Kembali
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-10">Form Pemesanan</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* FORM */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Data Penyewa
          </h2>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handlePemesanan();
            }}
          >
            <div>
              <label className="block font-semibold mb-2 text-gray-500">
                Nama Lengkap *
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-500">
                Nomor HP *
              </label>
              <input
                type="tel"
                value={nomorHP}
                onChange={(e) => setNomorHP(e.target.value)}
                placeholder="08123456789"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-500">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-500">
                Lama Sewa *
              </label>
              <select
                value={lamaSewa}
                onChange={(e) => setLamaSewa(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
              >
                <option>1 Bulan</option>
                <option>3 Bulan</option>
                <option>6 Bulan</option>
                <option>12 Bulan</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-500">
                Tanggal Masuk *
              </label>
              <input
                type="date"
                value={tanggalMasuk}
                onChange={(e) => setTanggalMasuk(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-500">
                Metode Pembayaran *
              </label>
              <select
                value={metodeBayar}
                onChange={(e) => setMetodeBayar(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                required
              >
                <option value="">Pilih metode pembayaran</option>
                <option value="transfer">Transfer Bank</option>
                <option value="ewallet">E-Wallet</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              Sewa Sekarang
            </button>
          </form>
        </div>

        {/* RINGKASAN PEMESANAN */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Ringkasan Pemesanan
          </h2>

          <div className="mb-4">
            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
              <Image
                src={
                  Array.isArray(room.gambar)
                    ? room.gambar[0]
                    : room.gambar || "/no-image.jpg"
                }
                alt={room.nama}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h3 className="font-semibold text-gray-900">{room.nama}</h3>
            <p className="text-gray-500 text-sm mb-3">{room.tipe}</p>

            <div className="text-sm text-gray-600 space-y-2">
              <p className="flex justify-between">
                <span>Harga per bulan</span>
                <span>Rp {hargaPerBulan.toLocaleString("id-ID")}</span>
              </p>
              <p className="flex justify-between">
                <span>Lama sewa</span>
                <span>{lamaSewa}</span>
              </p>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <p className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span className="text-blue-600">
                Rp {totalHarga.toLocaleString("id-ID")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
