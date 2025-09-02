"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Ocultar navbar al hacer scroll hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
  const handleClickOutside = (event) => {
     if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <div className="flex gap-3 items-center">
        {/* Botón Planes */}
        <Link
          href="/planes"
          className="relative bg-yellow-400 text-purple-900 px-6 py-2.5 rounded-lg font-semibold shadow-md backdrop-blur-sm border border-yellow-500/50 inline-block"
        >
          <span className="absolute -top-2 -left-2 text-x1">⚡</span>
          <span className="relative z-10">Planes</span>
        </Link>

        {/* Botón Iniciar Sesión */}
        <Link
          href="/login"
          className="relative bg-white/95 text-purple-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm border border-white/20"
        >
          <span className="relative z-10">Iniciar Sesión</span>
        </Link>

        {/* Botón Registrarse con menú desplegable */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative bg-gradient-to-r from-purple-800 to-purple-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-purple-900 hover:to-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 border border-purple-700/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
            <span className="relative z-10">Registrarse</span>
          </button>

          {menuOpen && (
  <div className="absolute right-3 mt-3 w-48 bg-white border border-gray-200 shadow-xl rounded-xl z-20 overflow-hidden">
    <div className="py-1">
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
        Tipos de Acceso
      </div>
      <ul className="py-1">
        <li>
          <Link
            href="/administrador-login"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-l-4 border-transparent hover:border-purple-500"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-4 h-4 mr-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            Administrador
          </Link>
        </li>
        <li>
          <Link
            href="/usuario-login"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-4 h-4 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Usuario
          </Link>
        </li>
        <li>
          <Link
            href="/empresa-login"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 border-l-4 border-transparent hover:border-green-500"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd" />
            </svg>
            Empresa
          </Link>
        </li>
      </ul>
    </div>
  </div>
)}
        </div>
      </div>
    </nav>
  );
}
