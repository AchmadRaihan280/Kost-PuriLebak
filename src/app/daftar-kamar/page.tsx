"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // pastikan kamu sudah setup firebase.ts di kost-puri-lebak

interface Room {
  id: string;
  nama: string;
  tipe: string;
  harga: string;
  ukuran: string;
  deskripsi?: string;
  fasilitas: string[];
  gambar: string[]; // bisa array Cloudinary URLs
  status: string;
}

export default function DaftarKamarPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data kamar dari Firestore
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rooms"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Room[];

        setRooms(data);
      } catch (error) {
        console.error("❌ Gagal mengambil data kamar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat data kamar...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* HEADING */}
      <section className="text-center mt-12 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Daftar Kamar</h1>
        <p className="text-gray-600">
          Pilih kamar yang sesuai dengan kebutuhan dan budget Anda
        </p>
      </section>

      {/* LIST KAMAR */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {rooms.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data kamar.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                {/* GAMBAR */}
                <div className="relative">
                  <Image
                    src={
                      Array.isArray(room.gambar)
                        ? room.gambar[0]
                        : room.gambar || "/no-image.jpg"
                    }
                    alt={room.nama}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover"
                    unoptimized // supaya aman kalau URL belum diset di next.config.js
                  />
                  <span
                    className={`absolute top-3 right-3 text-sm px-3 py-1 rounded-full font-semibold ${
                      room.status === "Tersedia"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>

                {/* DETAIL */}
                <div className="p-6 text-left">
                  <h3 className="text-lg font-bold text-gray-900">
                    {room.nama}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{room.tipe}</p>

                  <p className="text-blue-600 font-bold text-xl mb-4">
                    Rp {Number(room.harga).toLocaleString("id-ID")} /bulan
                  </p>

                  <p className="text-gray-600 text-sm mb-3">📏 {room.ukuran}</p>

                  {room.fasilitas?.length > 0 && (
                    <div className="text-gray-500 text-sm mb-6">
                      {room.fasilitas.slice(0, 3).join(" · ")}{" "}
                      {room.fasilitas.length > 3 &&
                        `+${room.fasilitas.length - 3} lainnya`}
                    </div>
                  )}

                  {/* 🔗 LINK KE DETAIL */}
                  {room.status === "Tersedia" ? (
                    <Link
                      href={`/daftar-kamar/${room.id}`}
                      className="w-full block text-center py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Lihat Detail →
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 rounded-lg font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
                    >
                      Tidak Tersedia
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 w-full py-12 px-6 mt-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-gray-700">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">Puri Lebak</h3>
            <p className="text-sm">
              Kost modern dan nyaman dengan fasilitas lengkap untuk kehidupan
              yang lebih baik.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">Beranda</Link>
              </li>
              <li>
                <Link href="/daftar-kamar">Daftar Kamar</Link>
              </li>
              <li>
                <Link href="/tentang">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/kontak">Kontak</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li>Jl. Lebak Indah No. 123, Jakarta Selatan</li>
              <li>+62 812-3456-7890</li>
              <li>info@purilebak.com</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm mt-10">
          © 2025 Kost Puri Lebak. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
