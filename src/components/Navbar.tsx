"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-bold px-3 py-2 rounded-lg text-sm">
            PL
          </div>
          <span className="font-semibold text-lg text-gray-900">
            Puri Lebak
          </span>
        </div>

        {/* MENU */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {[
            { name: "Beranda", href: "/" },
            { name: "Daftar Kamar", href: "/daftar-kamar" },
            { name: "Tentang Kami", href: "/tentang" },
            { name: "Kontak", href: "/kontak" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`px-3 py-2 rounded-md transition ${
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* TOMBOL HUBUNGI KAMI */}
        <Link
          href="#kontak"
          className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full transition"
        >
          <Phone size={18} /> Hubungi Kami
        </Link>
      </nav>
    </header>
  );
}
