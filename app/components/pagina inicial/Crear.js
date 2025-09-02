export default function Crear() {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/4 via-pink-600/2 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-blue-600/3 via-purple-600/2 to-transparent rounded-full blur-3xl"></div>
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-blue-400/40 rounded-full animate-ping"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">

          
<h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
  ¿ERES UNA{" "}
  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent relative inline-block">
    EMPRESA?
    <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-full opacity-40"></div>
  </span>
</h2>

          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <div className="px-4 py-1.5 bg-gray-50 rounded-full border border-gray-200">
              <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                EMPRESA • NEGOCIO • RECLUTADOR
              </span>
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-pink-400 to-transparent"></div>
          </div>
        </div>

        {/* Process Flow - Circular Design */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-16 lg:gap-8 relative">

            {/* Step 1 - Top Left */}
            <div className="group relative lg:self-start">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 scale-110"></div>
              
              <div className="relative bg-white/95 backdrop-blur-sm rounded-[2rem] border border-white/60 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-3 group-hover:rotate-1 overflow-hidden">
                
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Step Number */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  <span className="text-white font-black text-xl">01</span>
                </div>
                
                <div className="p-10">
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                      <span className="text-white text-3xl font-bold">+</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-yellow-900 text-xs font-bold">✓</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                    CREA CUENTA
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Registro empresarial verificado en <span className="text-purple-600 font-semibold">60 segundos</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Curved Arrow 1 */}
            <div className="hidden lg:block absolute top-8 left-1/3 transform -translate-x-1/2">
              <svg width="140" height="80" viewBox="0 0 140 80" className="text-purple-400">
                <defs>
                  <linearGradient id="arrow1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(147, 51, 234)" />
                    <stop offset="100%" stopColor="rgb(236, 72, 153)" />
                  </linearGradient>
                </defs>
                <path d="M 10 70 Q 70 10 130 40" stroke="url(#arrow1)" strokeWidth="3" fill="none" strokeDasharray="8,4" className="animate-pulse" />
                <polygon points="125,35 130,40 125,45 135,40" fill="url(#arrow1)" />
              </svg>
            </div>

            {/* Step 2 - Center */}
            <div className="group relative lg:mt-16">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 scale-110"></div>
              
              <div className="relative bg-white/95 backdrop-blur-sm rounded-[2rem] border border-white/60 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-3 group-hover:-rotate-1 overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  <span className="text-white font-black text-xl">02</span>
                </div>
                
                <div className="p-10">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-xl">
                      <span className="text-white text-3xl">🎯</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-green-900 text-xs font-bold">AI</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                    BUSCA & PUBLICA
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    IA avanzada encuentra <span className="text-blue-600 font-semibold">candidatos perfectos</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Curved Arrow 2 */}
            <div className="hidden lg:block absolute top-24 right-1/3 transform translate-x-1/2">
              <svg width="140" height="80" viewBox="0 0 140 80" className="text-blue-400">
                <defs>
                  <linearGradient id="arrow2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                    <stop offset="100%" stopColor="rgb(236, 72, 153)" />
                  </linearGradient>
                </defs>
                <path d="M 10 40 Q 70 70 130 10" stroke="url(#arrow2)" strokeWidth="3" fill="none" strokeDasharray="8,4" className="animate-pulse" />
                <polygon points="125,5 130,10 125,15 135,10" fill="url(#arrow2)" />
              </svg>
            </div>

            {/* Step 3 - Top Right */}
            <div className="group relative lg:self-start">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-orange-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 scale-110"></div>
              
              <div className="relative bg-white/95 backdrop-blur-sm rounded-[2rem] border border-white/60 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-3 group-hover:rotate-1 overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-pink-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  <span className="text-white font-black text-xl">03</span>
                </div>
                
                <div className="p-10">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-orange-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                      <span className="text-white text-3xl">🚀</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-emerald-900 text-xs font-bold">!</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-pink-700 transition-colors duration-300">
                    CONECTA DIRECTO
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Contacto <span className="text-pink-600 font-semibold">instantáneo</span> sin intermediarios
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Central Connection Indicator */}

        </div>

        {/* Success Metrics */}

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center group">
            <div className="px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group-hover:rotate-1">
              <div className="flex items-center space-x-4">
                <span>Comenzar Ahora</span>
                <div className="w-6 h-6 border-2 border-white/80 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}