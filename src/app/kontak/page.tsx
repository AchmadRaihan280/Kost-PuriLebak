"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("✅ Pesan berhasil dikirim!");
      setFormData({ nama: "", email: "", pesan: "" });
    } else {
      alert("❌ Gagal mengirim pesan. Coba lagi nanti.");
    }
  };

  return (
    <main className="bg-white text-gray-800 min-h-screen">
      {/* HEADING */}
      <section className="text-center mt-12 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
        <p className="text-gray-600">
          Punya pertanyaan? Kami siap membantu Anda. Hubungi kami melalui form
          di bawah atau kontak langsung.
        </p>
      </section>

      {/* KONTAK & FORM */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 mb-20">
        {/* INFO KONTAK */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">📍</div>
            <div>
              <h3 className="font-semibold text-gray-900">Alamat</h3>
              <p>Jl. Lebak Indah No. 123, Jakarta Selatan 12345</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">☎️</div>
            <div>
              <h3 className="font-semibold text-gray-900">Telepon</h3>
              <p>+62 812-3456-7890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">✉️</div>
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p>info@purilebak.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">⏰</div>
            <div>
              <h3 className="font-semibold text-gray-900">Jam Operasional</h3>
              <p>Senin – Minggu: 08.00 - 20.00</p>
            </div>
          </div>

          {/* WHATSAPP */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-md">
            <h3 className="font-semibold mb-2">Chat via WhatsApp</h3>
            <p className="text-sm mb-4">
              Butuh respons cepat? Chat langsung dengan kami!
            </p>
            <Link
              href="https://wa.me/6282298452935"
              target="_blank"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg inline-block transition"
            >
              Hubungi via WhatsApp
            </Link>
          </div>
        </div>

        {/* FORM PESAN */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-3xl shadow-md p-8 space-y-6"
        >
          <div>
            <label className="block font-semibold mb-2">Nama Lengkap *</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Masukkan nama Anda"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Pesan *</label>
            <textarea
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              required
              placeholder="Tulis pesan Anda di sini..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            Kirim Pesan
          </button>
        </form>
      </section>

      {/* GOOGLE MAPS */}
      <section className="max-w-6xl mx-auto mb-20 px-6">
        <div className="rounded-3xl overflow-hidden shadow-md h-[450px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2853453568923!2d106.83417917355638!3d-6.357098862188097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec3ee27b72ab%3A0xad7e3b1550a40bc6!2sKost%20Puri%20Lebak!5e0!3m2!1sid!2sid!4v1761786714117!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
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
                <a href="#">Beranda</a>
              </li>
              <li>
                <a href="#">Daftar Kamar</a>
              </li>
              <li>
                <a href="#">Tentang Kami</a>
              </li>
              <li>
                <a href="#">Kontak</a>
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
