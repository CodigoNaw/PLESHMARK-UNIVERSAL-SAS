import Image from "next/image";

export default function Vacancies() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header mejorado */}
        <div className="text-center mb-16">
          
<h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1] tracking-tight mb-8">
  <span className="inline-block transform hover:scale-105 transition-transform duration-300">
    ALGUNAS DE ODERTAS
  </span>

  <span className="block mt-3 relative group">
    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative">
      OFERTAS
      <div className="absolute -top-1 -right-5 w-3.5 h-3.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-80"></div>
    </span>
    <span className="ml-4 bg-gradient-to-r from-pink-600 via-orange-500 to-red-500 bg-clip-text text-transparent relative inline-block group-hover:rotate-2 transition-transform duration-300">
      DESTACADAS
      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400/60 to-orange-400/60 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </span>
  </span>
</h2>

          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conectamos talento excepcional con empresas líderes del mercado
          </p>
        </div>

        {/* Grid de vacantes premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 - Profesional */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 
                        shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            
            {/* Imagen con overlay */}
            <div className="relative overflow-hidden">
              <Image
                src="/N1.png"
                alt="Distribuidora Palermo"
                width={400}
                height={250}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Badge de empresa */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/50">
                <span className="text-gray-800 font-semibold text-xs">DISTRIBUCIÓN</span>
              </div>
              
              {/* Indicador de calidad */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">★</span>
              </div>
            </div>
            
            {/* Contenido */}
            <div className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  DISTRIBUIDORA PALERMO
                </h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Una de las mejores distribuidoras del sector de Teusaquillo con la mejor calidad de ambiente para sus trabajadores
              </p>
              
              {/* Footer de la card */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium text-sm">Activa</span>
                </div>
                <span className="text-purple-600 font-semibold text-sm">Ver detalles →</span>
              </div>
            </div>
          </div>

          {/* Card 2 - Profesional */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 
                        shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            
            <div className="relative overflow-hidden">
              <Image
                src="/N2.png"
                alt="Crepes & Waffles"
                width={400}
                height={250}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/50">
                <span className="text-gray-800 font-semibold text-xs">GASTRONOMÍA</span>
              </div>
              
              <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">★</span>
              </div>
            </div>
            
            <div className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  CREPES & WAFFLES
                </h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Crepes & Waffles es una cadena de restaurantes colombiana creada en 1980 en la ciudad de Bogotá por dos estudiantes del Colegio de Estudios Superiores de Administración.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium text-sm">Activa</span>
                </div>
                <span className="text-purple-600 font-semibold text-sm">Ver detalles →</span>
              </div>
            </div>
          </div>

          {/* Card 3 - Profesional */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 
                        shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            
            <div className="relative overflow-hidden">
              <Image
                src="/N3.png"
                alt="Cine Colombia"
                width={400}
                height={250}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/50">
                <span className="text-gray-800 font-semibold text-xs">ENTRETENIMIENTO</span>
              </div>
              
              <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">★</span>
              </div>
            </div>
            
            <div className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  CINE COLOMBIA
                </h3>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Cine Colombia es la compañía de exhibición y distribución de películas más grande de Colombia, fundada en 1927.
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium text-sm">Activa</span>
                </div>
                <span className="text-purple-600 font-semibold text-sm">Ver detalles →</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>Explorar todas las ofertas</span>
          </div>
        </div>
      </div>
    </section>
  );
}