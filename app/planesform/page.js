"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FormularioEmpresa() {
  const [formData, setFormData] = useState({
    empresa: "",
    nit: "",
    telefono: "",
    plan: "basic",
    terminos: false,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terminos) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      const res = await fetch("/api/envio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ En unos minutos lo estaremos llamando");
        setFormData({
          empresa: "",
          nit: "",
          telefono: "",
          plan: "basic",
          terminos: false,
        });
        router.push("/planes");
      } else {
        alert("❌ Error al enviar el formulario: " + data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("❌ Hubo un problema enviando el correo");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 relative">
      
      {/* Botón para volver a /planes */}
      <button
        onClick={() => router.push("/planes")}
        className="absolute top-5 left-5 flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full p-2 hover:bg-white/90 transition shadow-md z-10"
      >
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium text-blue-600">Planes</span>
      </button>

      {/* Contenedor principal */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl w-full">
        
        {/* Formulario a la izquierda */}
        <div className="flex-1 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm p-5 bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl shadow-xl space-y-5"
          >
            <h2 className="text-2xl font-extrabold text-center text-gray-800">
              Registro de plan
            </h2>

            {/* Empresa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                placeholder="Tu empresa increíble"
              />
            </div>

            {/* NIT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIT
              </label>
              <input
                type="text"
                name="nit"
                value={formData.nit}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                placeholder="123456789-1"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                placeholder="+57 300 123 4567"
              />
            </div>

            {/* Plan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan
              </label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition cursor-pointer"
              >
                <option value="basic">💎 Basic</option>
                <option value="pro">🚀 Pro</option>
              </select>
            </div>

            {/* Términos */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-400 transition"
              />
              <label className="text-sm text-gray-700">
                Acepto los{" "}
                <a
                  href="/terminos"
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  términos y condiciones
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Imagen a la derecha */}
<div className="hidden md:flex flex-1 justify-center items-center">
  <div className="relative w-full max-w-sm"> {/* controla el tamaño máximo */}
    <Image
      src="/no1.png"
      alt="Persona señalando"
      width={400}
      height={400}
      className="w-full h-auto object-contain"
      priority
    />
  </div>
</div>



      </div>
    </div>
  );
}
