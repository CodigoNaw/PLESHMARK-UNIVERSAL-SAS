import Image from "next/image";

export default function Estrategias() {
  return (
    <section className="relative bg-gradient-to-br from-slate-100 via-white to-blue-50 py-16">
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* CONTENIDO DE TEXTO */}
          <div className="space-y-6">
            
            {/* Título */}
            <div className="space-y-3">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                ESTRATEGIAS
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
            
            {/* Contenido principal */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500">
              <div className="relative">
                <div className="text-3xl text-blue-500/30 font-serif absolute -top-2 -left-2">"</div>
                
                <p className="text-lg leading-relaxed text-gray-700 font-medium pl-6">
                  ¡Vamos a aprovechar nuestras redes sociales para generar un mayor impacto! 
                  Queremos que las personas que no conocen nuestras ofertas puedan descubrirlas 
                  y creer en ellas. Utilizaremos distintas plataformas para llegar a un público 
                  más amplio y crear un impacto duradero.
                </p>
                
                <div className="text-3xl text-indigo-500/30 font-serif absolute -bottom-2 -right-2 rotate-180">"</div>
              </div>
            </div>

            {/* Indicadores */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-blue-700 font-semibold">Estrategia Digital</span>
              </div>
              
              <div className="flex gap-2">
                <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-6 h-2 bg-indigo-500 rounded-full"></div>
                <div className="w-4 h-2 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* IMÁGENES */}
          <div className="flex justify-center">
            <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-gray-200">
              
              {/* Marco decorativo */}
              <div className="absolute inset-3 border border-gray-100 rounded-2xl"></div>
              
              {/* Contenedor de imágenes */}
              <div className="flex gap-4 items-center relative z-10">
                
                {/* Imagen izquierda */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-xl opacity-50"></div>
                  <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="/BL1.png"
                      alt="Distribuidora Palermo"
                      width={180}
                      height={250}
                      className="rounded-xl shadow-lg border-2 border-white"
                    />
                  </div>
                </div>

                {/* Imagen derecha */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-xl opacity-50"></div>
                  <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="/BL2.png"
                      alt="Kevin Aragon"
                      width={180}
                      height={250}
                      className="rounded-xl shadow-lg border-2 border-white"
                    />
                  </div>
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}