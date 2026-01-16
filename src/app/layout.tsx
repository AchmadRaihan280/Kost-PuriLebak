import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Kost Puri Lebak",
  description: "Temukan kost impian Anda di lokasi strategis dan nyaman.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-800">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
