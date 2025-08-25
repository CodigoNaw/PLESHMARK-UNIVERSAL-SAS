"use client"; 
import Navbar from "../components/pagina inicial/Navbar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaBuilding, FaCog } from "react-icons/fa";

export default function Login() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (   
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/t8.png')" }}
    >
      {/* Overlay para mejor contraste */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 flex flex-col items-center border border-white/30 w-72 max-w-sm mx-4">
            
            {/* Logo */}
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mb-5 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
              <Image 
                src="/Logo.png" 
                alt="Logo Pleshmark" 
                width={28} 
                height={28} 
                className="relative z-10"
              />
            </div>

            {/* Título */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-1">
              PLESHMARK
            </h1>
            
            <p className="text-gray-600 text-xs text-center mb-5 font-medium leading-snug">
              Conecta con tu futuro profesional
            </p>

            {/* Botón principal */}
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="w-full bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 text-gray-700 font-semibold py-2 px-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 flex justify-between items-center shadow-md hover:shadow-lg text-sm"
            >
              <span>Seleccionar</span>
              <div className={`transform transition-all duration-300 ${menuAbierto ? "rotate-180" : ""}`}>
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Menú desplegable */}
            <div className="relative w-full">
              {menuAbierto && (
                <div className="absolute top-full left-0 mt-2 w-full flex flex-col gap-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-2 animate-in fade-in duration-200 z-20">
                  
                  <Link href="/usuario-login">
                    <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-3 rounded-md font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2">
                      <FaUser className="text-sm" />
                      <span>Usuario</span>
                    </button>
                  </Link>

                  <Link href="/empresa-login">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-3 rounded-md font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2">
                      <FaBuilding className="text-sm" />
                      <span>Empresa</span>
                    </button>
                  </Link>

                  <Link href="/administrador-login">
                    <button className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white py-2 px-3 rounded-md font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2">
                      <FaCog className="text-sm" />
                      <span>Administrador</span>
                    </button>
                  </Link>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
