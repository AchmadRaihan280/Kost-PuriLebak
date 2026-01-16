"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Room {
  id: string;
  nama: string;
  tipe: string;
  harga: string;
  ukuran: string;
  status: string;
  gambar: string[];
  fasilitas: string[];
  deskripsi: string;
}

export default function DetailKamarPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

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
        console.error("Gagal mengambil data kamar:", error);
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

  // Fungsi untuk swipe kanan/kiri
  const handleSwipe = (direction: "left" | "right") => {
    if (!room?.gambar?.length) return;
    setCurrentImage((prev) => {
      if (direction === "left") {
        return prev === 0 ? room.gambar.length - 1 : prev - 1;
      } else {
        return prev === room.gambar.length - 1 ? 0 : prev + 1;
      }
    });
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-16 select-none">
        <Link
          href="/daftar-kamar"
          className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 mb-6"
        >
          ← Kembali
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* GALERI GAMBAR KIRI */}
          <div>
            {/* Gambar utama */}
            <motion.div
              key={currentImage}
              className="relative w-full h-[380px] rounded-2xl overflow-hidden shadow-md cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(
                _: MouseEvent | TouchEvent | PointerEvent,
                info: { offset: { x: number } }
              ) => {
                if (info.offset.x < -100) handleSwipe("right");
                if (info.offset.x > 100) handleSwipe("left");
              }}
            >
              <Image
                src={
                  Array.isArray(room.gambar)
                    ? room.gambar[currentImage]
                    : room.gambar || "/no-image.jpg"
                }
                alt={room.nama}
                fill
                className="object-cover transition-all duration-300"
              />
              <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm shadow">
                {room.status}
              </span>
              {/* Indikator posisi gambar */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {room.gambar?.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentImage ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Thumbnail */}
            {Array.isArray(room.gambar) && room.gambar.length > 1 && (
              <div className="flex gap-3 mt-4">
                {room.gambar.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition ${
                      currentImage === idx
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${room.nama} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETAIL KANAN */}
          <div>
            <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 text-sm rounded mb-2">
              {room.tipe}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {room.nama}
            </h1>
            <p className="text-gray-600 mb-4">
              Jl. Lebak Indah No. 123, Jakarta Selatan
            </p>

            <p className="text-blue-600 text-3xl font-bold mb-2">
              Rp {Number(room.harga).toLocaleString("id-ID")}
              <span className="text-gray-600 text-base font-normal">
                {" "}
                /bulan
              </span>
            </p>
            <p className="text-gray-500 mb-6">Ukuran: {room.ukuran}</p>

            {/* Fasilitas */}
            {room.fasilitas?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Fasilitas</h3>
                <ul className="grid grid-cols-2 gap-2 text-gray-600">
                  {room.fasilitas.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Deskripsi */}
            {room.deskripsi && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">
                  {room.deskripsi}
                </p>
              </div>
            )}

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/pesan/${room.id}`}
                className="flex-1 bg-linear-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold text-center hover:opacity-90 transition"
              >
                Pesan Sekarang
              </Link>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 text-center hover:bg-gray-100 transition"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 mt-20">
        <div className="max-w-6xl mx-auto py-12 px-6 grid md:grid-cols-3 gap-10 text-gray-700">
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
                <a href="/" className="hover:text-blue-600">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/daftar-kamar" className="hover:text-blue-600">
                  Daftar Kamar
                </a>
              </li>
              <li>
                <a href="/tentang-kami" className="hover:text-blue-600">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/kontak" className="hover:text-blue-600">
                  Kontak
                </a>
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

        <div className="border-t border-gray-200 pt-4 pb-6 text-center text-gray-400 text-sm">
          © 2025 Kost Puri Lebak. All rights reserved.
        </div>
      </footer>
    </>
  );
}
