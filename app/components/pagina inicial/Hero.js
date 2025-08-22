export default function Hero() {
  return (
    <section 
      className="relative h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-center text-white"
    style={{ backgroundImage: "url('/hero.png')" }}
    >
      
      <div className="absolute inset-0 bg-black/50"></div>

     
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold">
          TU PRÓXIMO EMPLEO TE ESTÁ ESPERANDO
        </h1>
        <p className="mt-4 text-lg md:text-xl text-center max-w-2xl mx-auto">

          Conectamos el talento excepcional con las mejores oportunidades.
           Descubre empleos que se ajusten perfectamente a tu perfil profesional.
        </p>
      </div>
    </section>
  );
}
