import Image from "next/image";

export default function Features() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          ¿POR QUÉ ELEGIR PLESHMARK?
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          

<div
  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
  style={{
    borderRight: "4px solid #e100ffff",
    borderBottom: "4px solid #e100ffff"
  }}
>
  <Image
    src="/p1.png"
    alt="Matching Inteligente"
    width={400}
    height={250}
    className="w-full h-48 object-cover"
  />
  <div className="p-6">
    <h3 className="text-xl font-semibold text-bold-700">Matching Inteligente</h3>
    <p className="mt-2 text-gray-600">
      Nuestro algoritmo encuentra las oportunidades que mejor se adaptan a tu perfil, experiencia y objetivos profesionales.
    </p>
  </div>
</div>




<div
  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
  style={{
    borderRight: "4px solid #e100ffff",
    borderBottom: "4px solid #e100ffff"
  }}
>            <Image
              src="/p2.png"
              alt="Proceso Rápido"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-bold-700">Proceso Rápido</h3>
              <p className="mt-2 text-gray-600">
                Postúlate con un clic. Nuestro sistema optimizado acelera el proceso de selección para resultados más rápidos.
              </p>
            </div>
          </div>


<div
  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
  style={{
    borderRight: "4px solid #e100ffff",
    borderBottom: "4px solid #e100ffff"
  }}
>            <Image
              src="/p3.png"
              alt="Empresas Confiables"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-bold-700">Empresas Confiables</h3>
              <p className="mt-2 text-gray-600">
                Trabajamos solo con compañías verificadas y de calidad.
              </p>
            </div>
          </div>


<div
  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
  style={{
    borderRight: "4px solid #e100ffff",
    borderBottom: "4px solid #e100ffff"
  }}
>            <Image
              src="/p4.png"
              alt="Diferentes Empresas"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-bold-700">Diferentes Empresas</h3>
              <p className="mt-2 text-gray-600">
                Accede a oportunidades exclusivas en las mejores empresas del mercado, desde startups hasta corporaciones globales.
              </p>
            </div>
          </div>


<div
  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
  style={{
    borderRight: "4px solid #e100ffff",
    borderBottom: "4px solid #e100ffff"
  }}
>            <Image
              src="/p5.png"
              alt="Oportunidades"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-bold-700">Oportunidades</h3>
              <p className="mt-2 text-gray-600">
                Desde trabajos locales hasta posiciones remotas internacionales. Expande tus horizontes profesionales sin límites.
              </p>
            </div>
          </div>


<div
  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
  style={{
    borderRight: "4px solid #e100ffff",
    borderBottom: "4px solid #e100ffff"
  }}
>            <Image
              src="/p6.png"
              alt="Privacidad Total"
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-bold-700">Privacidad Total</h3>
              <p className="mt-2 text-gray-600">
                Elige quién puede ver y usar tu información de contacto.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
