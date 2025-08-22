import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-200 border-t-4 border-purple-500 shadow-[0_-4px_15px_rgba(168,85,247,0.7)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        

        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold">l CONTACTANOS</h2>
          <p className="mt-4 text-gray-700">
            En Pleshmark resolvemos todas tus dudas. Puedes comunicarte con nosotros
            a través de nuestras redes sociales, líneas telefónicas o visitarnos
            en nuestra sede principal.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div>
              <p>🏠carrera 18 49 82</p>
              <p>📲302701157 - 3006843507</p>
              <p>📪pleshmark@gmail.com</p>
            </div>


            <div>
              <p>-instagram: pleshmarkcard</p>
              <p>-facebook: pleshmark</p>
              <p>-tiktok: pleshmarkfuture</p>
            </div>
          </div>
        </div>


<div className="w-1/3 relative">
    <Image
      src="/T1.png"
      alt="Sede Pleshmark"
      fill
      className="object-cover h-full"

          />
        </div>
      </div>

 
      <div className="bg-[#af69cd] text-white text-center py-3">
        © 2025 PLESHMARK. Tu futuro profesional comienza aquí.
      </div>
    </footer>
  );
}