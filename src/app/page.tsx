import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-kost.jpg')" }}
      >
        {/* GRADIENT OVERLAY PUTIH DARI KIRI KE KANAN */}
        <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/60 to-transparent"></div>

        {/* KONTEN TEKS */}
        <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6 md:px-12">
          {/* TEKS KIRI */}
          <div className="text-left">
            <p className="flex items-center gap-2 text-blue-700 font-medium mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.125-7.5 11.25-7.5 11.25S4.5 17.625 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              Jakarta Selatan
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Temukan Kost <span className="text-blue-600">Impian Anda</span>
            </h1>

            <p className="mt-4 text-lg text-gray-700 max-w-lg">
              Kost modern dengan fasilitas lengkap di lokasi strategis. Nyaman,
              aman, dan terjangkau untuk kehidupan yang lebih baik.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition">
                Lihat Kamar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>

              <button className="bg-white border border-gray-300 text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                Hubungi Kami
              </button>
            </div>
          </div>

          {/* BAGIAN KANAN (KOSONG UNTUK MENAMPILKAN GAMBAR) */}
          <div className="hidden md:block"></div>
        </div>
      </section>

      {/* MENGAPA MEMILIH KAMI */}
      <section className="w-full bg-blue-50 py-20 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-gray-600 mb-12">
            Fasilitas terbaik untuk kenyamanan hidup Anda
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📶",
                title: "WiFi Cepat",
                desc: "Internet berkecepatan tinggi untuk mendukung aktivitas online Anda.",
              },
              {
                icon: "🔒",
                title: "Keamanan 24/7",
                desc: "Sistem keamanan terintegrasi dengan CCTV dan petugas keamanan.",
              },
              {
                icon: "🕐",
                title: "Akses Fleksibel",
                desc: "Akses kost 24 jam tanpa batasan waktu keluar-masuk.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md hover:shadow-xl p-8 rounded-2xl transition-all duration-300"
              >
                <div className="text-blue-600 text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="bg-gray-50 py-20 w-full">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl text-black font-bold mb-4">Galeri Kost</h2>
          <p className="text-gray-600 mb-10">
            Lihat suasana nyaman dan fasilitas lengkap kami
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "/galeri1.jpg", title: "Kamar Nyaman" },
              { src: "/galeri2.jpeg", title: "Fasilitas Modern" },
              { src: "/galeri3.png", title: "Ruang Belajar" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl shadow-lg group"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform"
                />
                <div className="p-4 font-semibold text-gray-600">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full bg-linear-to-r from-blue-500 to-blue-700 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Menemukan Kamar Ideal Anda?
          </h2>
          <p className="text-gray-100 mb-8 text-lg">
            Jangan lewatkan kesempatan untuk tinggal di kost terbaik dengan
            harga terjangkau
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition">
            Pesan Sekarang →
          </button>
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
                <Link href="#">Beranda</Link>
              </li>
              <li>
                <Link href="#">Daftar Kamar</Link>
              </li>
              <li>
                <Link href="#">Tentang Kami</Link>
              </li>
              <li>
                <Link href="#">Kontak</Link>
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
