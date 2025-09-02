"use client"; // OBLIGATORIO para Client Component
import { useRouter } from "next/navigation";

import Navbar from "../components/pagina inicial/Navbar";
import Estrategias from "../components/pagina inicial/Estrategias";
import Relampago from "../components/pagina inicial/Relampago";
import Footer from "../components/pagina inicial/Footer";

import Image from "next/image";


export default function Ofertas() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/planesform"); // redirige
  };
  return (
    <>
      <Navbar />
      <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
        
        <div className="w-full flex justify-center items-center py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NUESTROS PLANES
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Plan PRO */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200 h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-center text-white relative">
                <div className="absolute top-2 right-2 bg-white/20 rounded-full px-2 py-1 text-xs font-semibold">
                  POPULAR
                </div>
                <h2 className="text-lg font-bold">PLAN PRO⚡</h2>
                <p className="text-sm opacity-90">Máximo rendimiento</p>
              </div>

              {/* Features */}
              <div className="p-4 flex-1">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border-l-4 border-orange-300">
                    <span className="text-orange-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Asistencia 24/7 dedicada</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border-l-4 border-orange-300">
                    <span className="text-orange-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Marketing estratégico</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border-l-4 border-orange-300">
                    <span className="text-orange-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Redes sociales completas</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border-l-4 border-orange-300">
                    <span className="text-orange-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Reclutamiento eventos</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border-l-4 border-orange-300">
                    <span className="text-orange-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">ADS posicionamiento</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border-l-4 border-orange-300">
                    <span className="text-orange-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Prioridad ofertas</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center border-t border-gray-200 pt-4">
                  <div className="relative">
                    <span className="text-2xl font-bold text-orange-600">
                      $90.000
                    </span>
                    <span className="absolute -top-1 -right-4 bg-red-500 text-white text-xs px-1 py-0.5 rounded">🔥</span>
                  </div>
                  <span className="block text-gray-600 text-sm mb-4">por mes</span>

                  {/* Button PRO */}
                  <button
                    onClick={handleClick}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    ⚡ OBTENER AHORA
                  </button>

                  <p className="text-xs text-gray-500 mt-2">*Términos aplicables</p>
                </div>
              </div>
            </div>

            {/* Plan BÁSICO */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-center text-white">
                <h2 className="text-lg font-bold">PLAN BÁSICO💼</h2>
                <p className="text-sm opacity-90">Solución esencial</p>
              </div>

              {/* Features */}
              <div className="p-4 flex-1">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                    <span className="text-purple-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Asistencia 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                    <span className="text-purple-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Redes sociales básicas</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                    <span className="text-purple-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">ADS básico</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                    <span className="text-purple-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Ofertas destacadas</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                    <span className="text-purple-500 text-lg">✅</span>
                    <span className="text-gray-700 font-medium">Marketing básico</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center border-t border-gray-200 pt-4">
                  <span className="text-2xl font-bold text-purple-600">
                    $50.000
                  </span>
                  <span className="block text-gray-600 text-sm mb-4">por mes</span>

                  {/* Button BÁSICO */}
                  <button
                    onClick={handleClick}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    💼 OBTENER AHORA
                  </button>

                  <p className="text-xs text-gray-500 mt-2">*Términos aplicables</p>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="flex justify-center lg:justify-start items-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-2xl blur opacity-30"></div>
                <Image
                  src="/b4.png"
                  alt="Profesional mostrando planes empresariales"
                  width={140}
                  height={210}
                  className="object-contain relative z-10"
                />
              </div>
            </div>
          </div>
        </div>

      </section>
      <Estrategias />
      <Relampago/>
      <Footer />
    </>
  );
}