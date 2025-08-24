"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // si baja
        setHidden(true);
      } else {
        // si sube
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white p-4 flex justify-between items-center shadow-xl backdrop-blur-sm border-b border-purple-400/20 z-50 transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
          <Image
            src="/Logo.png"
            alt="Logo pleshmark"
            width={50}
            height={60}
            className="relative z-10 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <span className="text-3xl font-bold tracking-wide group-hover:text-purple-100 transition-colors duration-300">
          PLESHMARK
        </span>
      </Link>

      <div className="flex gap-3">
        <Link
          href="/login"
          className="relative bg-white/95 text-purple-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm border border-white/20"
        >
          <span className="relative z-10">Iniciar Sesión</span>
        </Link>
        <Link
          href="/register"
          className="relative bg-gradient-to-r from-purple-800 to-purple-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-purple-900 hover:to-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 border border-purple-700/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
          <span className="relative z-10">Registrarse</span>
        </Link>
      </div>
    </nav>
  );
}
