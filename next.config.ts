import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // 👈 Izinkan gambar dari Cloudinary
  },
};

export default nextConfig;
