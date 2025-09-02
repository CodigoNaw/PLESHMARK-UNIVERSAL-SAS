import Image from "next/image";

export default function Features() {
  return (
<section className="bg-gray-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            ¿POR QUÉ ELEGIR PLESHMARK?
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-700 text-xl leading-relaxed max-w-4xl mx-auto font-medium">
            Descubre las ventajas que nos convierten en tu mejor aliado para encontrar el trabajo ideal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
<div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
              
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent z-10"></div>
                <Image
                  src="/p1.png"
                  alt="Matching Inteligente"
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-purple-600 text-sm font-semibold uppercase tracking-wider">INTELIGENCIA</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                  Matching Inteligente
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nuestro algoritmo avanzado encuentra las oportunidades que mejor se adaptan a tu perfil, experiencia y objetivos profesionales.
                </p>
              </div>
            </div>
          </div>


          {/* Feature 2 */}
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
    
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent z-10"></div>
      <Image
        src="/p2.png"
        alt="Proceso Rápido"
        width={400}
        height={250}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">VELOCIDAD</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
        Proceso Rápido
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Postúlate con un clic. Nuestro sistema optimizado acelera el proceso de selección para resultados más rápidos.
      </p>
    </div>
  </div>
</div>



          {/* Feature 3 */}
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
    
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent z-10"></div>
      <Image
        src="/p3.png"
        alt="Empresas Confiables"
        width={400}
        height={250}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
        <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">CONFIANZA</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
        Empresas Verificadas
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Colaboramos exclusivamente con empresas verificadas que cumplen nuestros rigurosos estándares de calidad y reputación.
      </p>
    </div>
  </div>
</div>


          {/* Feature 4 */}
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
    
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent z-10"></div>
      <Image
        src="/p4.png"
        alt="Red Global"
        width={400}
        height={300}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
        <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">ALCANCE</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors">
        Red Global
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Accede a una red internacional de empresas líderes, desde startups innovadoras hasta corporaciones multinacionales.
      </p>
    </div>
  </div>
</div>


          {/* Feature 5 */}
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
    
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-transparent z-10"></div>
      <Image
        src="/p5.png"
        alt="Flexibilidad Total"
        width={400}
        height={250}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-4 right-4 w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
        <span className="text-indigo-600 text-sm font-semibold uppercase tracking-wider">FLEXIBILIDAD</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-700 transition-colors">
        Flexibilidad Total
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Desde trabajos presenciales hasta posiciones 100% remotas. Encuentra la modalidad que se adapte a tu estilo de vida.
      </p>
    </div>
  </div>
</div>


          {/* Feature 6 */}
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
    
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-transparent z-10"></div>
      <Image
        src="/p6.png"
        alt="Seguridad Avanzada"
        width={400}
        height={250}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-4 right-4 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
        <span className="text-pink-600 text-sm font-semibold uppercase tracking-wider">SEGURIDAD</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-700 transition-colors">
        Seguridad Avanzada
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Control granular sobre tu información personal. Decide exactamente qué datos compartir y con quién en cada postulación.
      </p>
    </div>
  </div>
</div>


        </div>

      </div>
    </section>
  );
}