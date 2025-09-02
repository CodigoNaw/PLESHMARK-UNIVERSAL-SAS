import Image from "next/image";

export default function Relampago() {
  return (
    <section className="relative bg-gradient-to-br from-white via-cyan-50 to-rose-50 text-gray-900 p-12 overflow-hidden min-h-[600px] flex items-center">
      
      {/* EFECTOS DE FONDO ESTÁTICOS */}
      <div className="absolute inset-0">
        {/* Gradientes flotantes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-rose-400/12 to-purple-400/12 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/8 to-rose-400/8 rounded-full blur-3xl"></div>
        
        {/* Partículas flotantes estáticas */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full opacity-30"

          ></div>
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-16 max-w-7xl mx-auto">
        
        {/* CONTENIDO DE TEXTO ULTRA PREMIUM */}
        <div className="max-w-xl relative order-2 md:order-1">
          
          {/* Efectos de brillo alrededor del contenido */}
          <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/15 via-rose-500/15 to-purple-500/15 rounded-3xl blur-2xl"></div>
          
          <div className="relative bg-gradient-to-br from-cyan-500/10 to-rose-500/10 backdrop-blur-md p-8 rounded-3xl border border-cyan-500/30 shadow-2xl">
            
            {/* Icono decorativo principal */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>

            {/* Título con efectos ultra avanzados */}
            <div className="relative mb-8">
              <div className="absolute -inset-2 bg-gradient-to-r from-rose-400/25 to-purple-400/25 rounded-xl blur-lg"></div>
              <h2 className="relative text-6xl font-black tracking-tight leading-none">
                <span className="bg-gradient-to-r from-cyan-600 via-rose-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                  OFERTA RELAMPAGO
                </span>
              </h2>
              
              {/* Líneas decorativas estáticas */}
              <div className="flex items-center gap-3 mt-4">
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-rose-500 rounded-full shadow-lg"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full shadow-lg"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-lg"></div>
                <div className="flex gap-1">

                </div>
              </div>
            </div>
            
            {/* Contenido con efectos de profundidad */}
            <div className="relative">
              
              {/* Comilla decorativa ultra estilizada */}
              <div className="absolute -left-4 -top-4 text-6xl text-cyan-500/30 font-serif leading-none transform -rotate-12">"</div>
              
              <div className="relative bg-gradient-to-br from-cyan-500/5 to-rose-500/5 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20">
                <p className="text-xl leading-relaxed text-gray-700 font-medium relative z-10 pl-8">
                  Ponemos tu <span className="font-black bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">oferta pagada</span> 
                   en el lugar más visible: la parte superior del perfil de cada usuario. 
                  Así tu cargo disponible será lo primero que vean, aumentando la curiosidad, 
                  el interés y las posibilidades de conseguir al candidato ideal.
                </p>
              </div>
              
              <div className="absolute -right-4 -bottom-4 text-6xl text-purple-500/30 font-serif leading-none rotate-180 transform rotate-12">"</div>
            </div>

            {/* Indicadores de éxito */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-cyan-500/20">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">

                </div>
                <span className="text-sm text-gray-600 font-bold tracking-wide">MÁXIMA VISIBILIDAD</span>
              </div>
              
              <div className="flex gap-2">
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-rose-500 to-transparent rounded-full"></div>
                <div className="w-6 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Elementos flotantes decorativos estáticos */}
          <div className="absolute -right-12 top-12 w-24 h-24 border-2 border-cyan-500/20 rounded-full shadow-xl"></div>
          <div className="absolute -left-8 bottom-12 w-16 h-16 border-2 border-rose-500/20 rounded-full shadow-xl"></div>
          <div className="absolute -top-4 left-1/2 w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full shadow-xl"></div>
        </div>

        {/* IMAGEN CON EFECTOS CINEMATOGRÁFICOS */}
        <div className="relative order-1 md:order-2 group">
          
          {/* Halo de luz principal */}
          <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400/25 via-rose-500/15 to-purple-400/25 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-all duration-700"></div>
          
          {/* Marco con efectos de profundidad */}
          <div className="relative bg-gradient-to-br from-cyan-500/20 to-rose-500/15 p-6 rounded-3xl backdrop-blur-md border-2 border-cyan-500/40 shadow-2xl">
            
            {/* Efectos de esquinas */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-500 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-rose-500 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-purple-500 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-rose-500 rounded-br-lg"></div>
            
            {/* Imagen principal con efectos premium */}
            <div className="relative transform rotate-[-4deg] group-hover:rotate-0 transition-all duration-700 group-hover:scale-105">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-rose-500 rounded-xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/BL3.png"
                  alt="Oferta Relámpago Distribuidora Palermo"
                  width={420}
                  height={250}
                  className="rounded-xl shadow-2xl border-4 border-white/80 transition-all duration-700 group-hover:border-rose-400/70"
                />
                {/* Overlay con efectos de luz */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Efectos de destello estáticos */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-rose-400 rounded-full shadow-lg"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-500 rounded-full shadow-lg"></div>
              </div>
            </div>
            
            {/* Elementos decorativos flotantes alrededor de la imagen */}
            <div className="absolute -top-4 left-1/4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-rose-500 rounded-full shadow-xl"></div>
            <div className="absolute -bottom-4 right-1/4 w-4 h-4 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full shadow-xl"></div>
          </div>
          
          {/* Anillos orbitales estáticos */}
          <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full shadow-2xl"></div>
          <div className="absolute inset-4 border-2 border-rose-500/20 rounded-full shadow-2xl"></div>
        </div>
      </div>

      {/* ELEMENTOS DECORATIVOS GLOBALES ESTÁTICOS */}
     
    </section>
  );
}