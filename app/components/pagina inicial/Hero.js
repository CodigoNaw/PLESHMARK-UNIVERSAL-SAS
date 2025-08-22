export default function Hero() {
  return (
    <section 
      className="relative h-[497px] bg-cover bg-center flex flex-col justify-center items-center text-center text-white"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
            {/* Espacio blanco en la parte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[100px]"></div>
      
      {/* Recadro azul con la información */}
      <div className="absolute bottom-0 left-0 w-full h-[40px] ">
        <div className="text-center space-y-1 gap-8 flex items-center justify-center text-white">
          <div className="bg-purple-700 text-white rounded-xl shadow-lg p-6 text-center border border-purple-400">
            <p className="text-lg font-semibold">42 Empleos Activos</p>
          </div>
          <div className="bg-purple-700 text-white rounded-xl shadow-lg p-6 text-center border border-purple-400">
            <p className="text-lg font-semibold">103 Profesionales</p>
          </div>
          <div className="bg-purple-700 text-white rounded-xl shadow-lg p-6 text-center border border-purple-400">
            
            <p className="mt-2 text-lg">73 Empresas</p>
  
          </div>
        </div>
      </div>
    </section>
    
  );
}
