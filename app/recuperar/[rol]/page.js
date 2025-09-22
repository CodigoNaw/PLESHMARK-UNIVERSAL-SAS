"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RecuperarContraseña() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const res = await fetch("/api/empresa/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ocurrió un error");
        return;
      }

      setMensaje("Hemos enviado un enlace de recuperación a tu correo.");
      setCorreo("");
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Panel izquierdo - Imagen */}

      {/* Borde morado divisor */}
      <div className="hidden lg:block w-1 bg-purple-600 relative z-10"></div>

      {/* Panel derecho - Formulario */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
        
        {/* Header móvil */}
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-slate-900 font-bold text-xl">
            <Image src="/Logo.png" alt="Logo" width={32} height={32} />
            <span>PLESHMARK</span>
          </Link>
        </div>

        {/* Botón volver */}
        <div className="hidden lg:block absolute top-6 right-6">
          <Link href="/login" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          
          {/* Icono de seguridad */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Encabezado */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Recuperar contraseña</h2>
            <p className="text-slate-600">Ingresa tu correo para recuperar tu cuenta</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-slate-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Mensajes de estado */}
            {error && (
              <div className="flex items-center p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {error}
              </div>
            )}

            {mensaje && (
              <div className="flex items-center p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Enviar enlace de recuperación
            </button>
          </form>

          {/* Enlaces de navegación */}
          <div className="mt-8 text-center space-y-3">
            <div className="flex items-center justify-center">
              <div className="border-t border-slate-300 flex-1"></div>
              <span className="px-4 text-sm text-slate-500">¿Recordaste tu contraseña?</span>
              <div className="border-t border-slate-300 flex-1"></div>
            </div>
            
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/empresa-login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                Empresas
              </Link>
              <Link href="/administrador-login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                Administrador
              </Link>
              <Link href="/usuario-login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                Usuario
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}