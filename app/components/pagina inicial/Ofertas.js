import Image from "next/image";

export default function Ofertas() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex items-center justify-center py-16 px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        
        {/* Tarjeta PRO */}
        <div className="bg-gradient-to-b from-orange-500 to-purple-700 text-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-4 text-center">Oferta relámpago</h2>
          <h3 className="text-lg font-semibold text-center mb-4">Descripción</h3>
          <ul className="text-sm space-y-2 mb-6">
            <li>- asistencia las 24/7</li>
            <li>- ayuda en marketing</li>
            <li>- redes sociales todo el tiempo</li>
            <li>- reclutamiento rápido para tu empresa en eventos</li>
            <li>- posicionamiento de ads</li>
            <li>- prioridad en las ofertas</li>
            <li>- diferentes formas de marketing</li>
          </ul>
          <div className="text-center mt-auto">
            <span className="text-4xl font-extrabold">40.000</span>
            <span className="block text-sm">al mes</span>
            <p className="text-xs mt-2 opacity-80">aplica términos y condiciones</p>
            <span className="block text-lg font-bold mt-2">pro</span>
          </div>
        </div>

        {/* Tarjeta BÁSICO */}
        <div className="bg-gradient-to-b from-pink-300 to-purple-400 text-black rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-center mb-4">Descripción</h3>
          <ul className="text-sm space-y-2 mb-6">
            <li>- asistencia las 24/7</li>
            <li>- redes sociales todo el tiempo</li>
            <li>- posicionamiento de ads</li>
            <li>- prioridad en las ofertas</li>
            <li>- diferentes formas de marketing</li>
          </ul>
          <div className="text-center mt-auto">
            <span className="text-4xl font-extrabold">60.000</span>
            <span className="block text-sm">al mes</span>
            <p className="text-xs mt-2 opacity-80">aplica términos y condiciones</p>
            <span className="block text-lg font-bold mt-2">básico</span>
          </div>
        </div>

        {/* Imagen a la derecha */}
        <div className="flex justify-center">
          <Image
            src="/b4.png"
            alt="Persona mostrando planes"
            width={250}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
