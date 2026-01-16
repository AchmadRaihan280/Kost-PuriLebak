import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Tentang Kami | Kost Puri Lebak",
  description:
    "Pelajari lebih lanjut tentang Kost Puri Lebak — kost modern dan nyaman di Jakarta Selatan dengan fasilitas lengkap dan pelayanan terbaik.",
};

export default function TentangKami() {
  return (
    <main className="flex flex-col items-center justify-center pt-24">
      {/* HERO TITLE */}
      <section className="text-center max-w-4xl mx-auto px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Tentang Kost Puri Lebak
        </h1>
        <p className="text-gray-500 text-lg">
          Kost Puri Lebak adalah hunian modern yang dirancang untuk memberikan
          kenyamanan maksimal bagi mahasiswa dan pekerja profesional di Jakarta
          Selatan.
        </p>
      </section>

      {/* GAMBAR UTAMA */}
      <div className="relative w-full flex justify-center mb-20">
        {/* Container besar — hampir full, tapi masih sisakan 1cm dari tepi */}
        <div className="relative w-[97%] md:w-[96%] lg:w-[95%] overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/hero-kost.jpg"
            alt="Kost Puri Lebak"
            width={1920}
            height={1080}
            className="w-full h-[400px] object-cover"
          />

          {/* Gradasi lembut dari bawah ke atas */}
          <div className="absolute inset-0 bg-linear-to-t from-white/90 via-white/40 to-transparent rounded-3xl"></div>
        </div>
      </div>

      {/* CERITA KAMI */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Cerita Kami
        </h2>
        <p className="text-gray-500 leading-relaxed mb-4 text-justify">
          Didirikan pada tahun 2020, Kost Puri Lebak lahir dari keinginan untuk
          menyediakan hunian berkualitas tinggi dengan harga terjangkau di area
          strategis Jakarta Selatan. Kami memahami bahwa tempat tinggal yang
          nyaman adalah kunci produktivitas dan kesejahteraan.
        </p>
        <p className="text-gray-500 leading-relaxed mb-4 text-justify">
          Dengan lokasi yang strategis, dekat dengan universitas, pusat bisnis,
          dan fasilitas umum, kami berkomitmen untuk memberikan lebih dari
          sekadar tempat tinggal — tetapi sebuah rumah kedua yang nyaman bagi
          para penghuni kami.
        </p>
        <p className="text-gray-500 leading-relaxed text-justify">
          Hingga saat ini, kami telah melayani lebih dari 50 penghuni yang puas
          dengan berbagai pilihan kamar yang dapat disesuaikan dengan kebutuhan
          dan budget masing-masing.
        </p>
      </section>

      {/* VISI MISI */}
      <section className="w-full bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Visi, Misi & Nilai Kami
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="text-blue-600 text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Visi Kami
              </h3>
              <p className="text-gray-600">
                Menjadi penyedia kost terdepan yang mengutamakan kenyamanan dan
                kepuasan penghuni dengan fasilitas berkualitas tinggi.
              </p>
            </div>

            <div>
              <div className="text-blue-600 text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Misi Kami
              </h3>
              <p className="text-gray-600">
                Menyediakan hunian kost yang aman, nyaman, dan terjangkau dengan
                pelayanan terbaik untuk mendukung produktivitas penghuni.
              </p>
            </div>

            <div>
              <div className="text-blue-600 text-5xl mb-4">💙</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Nilai Kami
              </h3>
              <p className="text-gray-600">
                Integritas, kualitas, dan kepuasan pelanggan adalah nilai utama
                dalam setiap layanan yang kami berikan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PENCAPAIAN */}
      <section className="w-full py-20 px-6 bg-white">
        <div className="w-[97%] md:w-[96%] lg:w-[95%] mx-auto">
          {/* BOX BIRU */}
          <div className="bg-linear-to-r from-blue-500 to-blue-700 text-white rounded-3xl shadow-lg py-16 px-8 md:px-16 text-center">
            <h2 className="text-3xl font-bold mb-10">Pencapaian Kami</h2>

            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <h3 className="text-5xl font-bold">50+</h3>
                <p className="mt-2 text-gray-100 text-lg">Penghuni Puas</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold">20+</h3>
                <p className="mt-2 text-gray-100 text-lg">Kamar Tersedia</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold">4.9</h3>
                <p className="mt-2 text-gray-100 text-lg">Rating Kepuasan</p>
              </div>
            </div>
          </div>
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
