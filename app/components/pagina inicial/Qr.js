import Image from "next/image";

export default function Qr() {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-6 py-12">
      <div className="max-w-7xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            
            {/* Sección QR Code */}
            <div className="flex-shrink-0 p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50">
              <div className="relative">
                {/* Fondo decorativo con capas */}
                <div className="absolute -inset-8 bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 rounded-3xl transform rotate-1"></div>
                <div className="absolute -inset-6 bg-white/90 rounded-2xl shadow-lg"></div>
                
                {/* Marco principal del QR */}
                <div className="relative bg-white p-8 rounded-2xl shadow-xl border-4 border-emerald-200">
                  {/* Esquinas decorativas mejoradas */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-l-6 border-t-6 border-emerald-400 rounded-tl-xl"></div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-r-6 border-t-6 border-emerald-400 rounded-tr-xl"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-6 border-b-6 border-emerald-400 rounded-bl-xl"></div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-6 border-b-6 border-emerald-400 rounded-br-xl"></div>
                  
                  {/* QR Code con marco interno */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl shadow-inner">
                    <Image
                      src="/QM1.png"
                      alt="Código QR para encuesta de satisfacción"
                      width={200}
                      height={200}
                      className="rounded-lg shadow-sm"
                    />
                  </div>
                  
                  {/* Indicador de escaneo */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h3a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4z"/>
                        </svg>
                        ESCANEAR
                      </div>
                    </div>
                  </div>
                </div>

                {/* Elementos decorativos flotantes */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full shadow-lg"></div>
                <div className="absolute bottom-8 left-4 w-2 h-2 bg-teal-400 rounded-full shadow-lg"></div>
                <div className="absolute top-1/2 -right-2 w-4 h-4 bg-green-300 rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* Sección de Texto */}
            <div className="flex-1 p-6 lg:p-12 bg-gradient-to-br from-white via-pink-50/30 to-rose-50/50">
              <div className="max-w-2xl">
                {/* Badge superior */}
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full mb-6 shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="font-bold text-sm uppercase tracking-wide">Tu opinión nos importa</span>
                </div>

                {/* Título principal */}
                <h1 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6 leading-none">
                  <span className="block">DANOS</span>
                  <span className="block bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 bg-clip-text text-transparent">
                    TUS
                  </span>
                  <span className="block">OPINIONES</span>
                </h1>
                
                {/* Descripción mejorada */}
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed mb-6">
                  <p className="text-xl">
                    Te invitamos a escanear nuestro código y completar la{" "}
                    <span className="font-black text-gray-900 bg-yellow-200 px-2 py-1 rounded-lg">
                      encuesta de satisfacción
                    </span>.
                  </p>
                  <p className="text-base">
                    De esta manera podremos seguir mejorando día a día y ofrecerte un servicio cada vez mejor.{" "}
                    <span className="text-3xl">🙌</span>
                  </p>
                </div>

                {/* Elementos de confianza */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">Solo 3 min</div>
                        <div className="text-gray-600 text-xs">Rápido y fácil</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">100% Privado</div>
                        <div className="text-gray-600 text-xs">Datos seguros</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">Tu voz cuenta</div>
                        <div className="text-gray-600 text-xs">Impacto real</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barra decorativa inferior */}
          <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-400"></div>
        </div>
      </div>
    </div>
  );
}