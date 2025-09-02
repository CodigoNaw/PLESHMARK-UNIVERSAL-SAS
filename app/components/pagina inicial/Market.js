import Image from "next/image";

export default function Market() {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/3 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-r from-blue-600/2 to-purple-600/2 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center gap-32">
          
          {/* Content Section */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 rounded-full">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-purple-700 text-xs font-semibold uppercase tracking-wider">ECOSISTEMA COMPLETO</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 leading-none tracking-tight">
                La
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Incorporación
                </span>
              </h2>
              
              {/* Decorative Line */}
              <div className="flex items-center space-x-3">
                <div className="w-14 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div className="w-7 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                <div className="w-3 h-1 bg-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-base">
              <p className="text-gray-700 leading-relaxed">
                <span className="text-gray-900 font-bold">Pleshmark</span> es una de las bolsas de empleo más completas del mercado, 
                incorporando sectores laborales que pocas plataformas alcanzan. Aquí encontrarás 
                empresas, negocios y reclutadores que nunca pensaste en conocer, de manera 
                <span className="text-purple-600 font-semibold"> rápida y sencilla</span>.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Nos enfocamos en la búsqueda desde <span className="text-pink-600 font-semibold">grandes compañías</span> hasta 
                <span className="text-blue-600 font-semibold"> pequeños negocios locales</span> y empleos temporales, 
                facilitando la conexión directa entre talento y oportunidades únicas.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center group">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-gray-600 text-xs font-medium uppercase tracking-wide">Empresas Activas</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-gray-600 text-xs font-medium uppercase tracking-wide">Profesionales</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">15</div>
                <div className="text-gray-600 text-xs font-medium uppercase tracking-wide">Industrias</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative group">
              
              {/* Floating Background Shape */}
              <div className="absolute inset-0 transform rotate-6 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 rounded-[2rem] group-hover:rotate-3 transition-transform duration-700 shadow-xl"></div>
              
              {/* Main Image Container */}
              <div className="relative transform -rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden group-hover:shadow-3xl transition-shadow duration-500">
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="p-6">
                    <Image
                      src="/x2.png"
                      alt="La Incorporación"
                      width={420}
                      height={360}
                      className="w-full h-auto object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-5 -right-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3 shadow-2xl transform rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                <div className="text-white text-xs font-bold whitespace-nowrap">🚀 Innovación</div>
              </div>
              
              <div className="absolute -bottom-5 -left-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3 shadow-2xl transform -rotate-12 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500">
                <div className="text-white text-xs font-bold whitespace-nowrap">🌟 Calidad</div>
              </div>
              
              <div className="absolute top-1/4 -left-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full p-2 shadow-xl animate-bounce">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              
              <div className="absolute top-3/4 -right-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full p-2 shadow-xl animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
