"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function UsuarioLogin() {
  const [modoRegistro, setModoRegistro] = useState(false);

  // Campos del registro
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [telefono, setTelefono] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();


  const handleRegister = async () => {
    setError("");
    if (contraseña !== confirmarContraseña) {
      return setError("Las contraseñas no coinciden");
    }
    const res = await fetch("/api/usuario/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contraseña, tipoDocumento, numeroDocumento, telefono }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    alert("Registro exitoso, ahora inicia sesión");
    setModoRegistro(false);
  };

  const handleLogin = async () => {
    setError("");
    const res = await fetch("/api/usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    localStorage.setItem("token", data.token);
    router.push("/usuario-dashboard");
  };

  return (
<div
  className="min-h-screen bg-gray-50 flex bg-cover bg-center"
  style={{ backgroundImage: "url('/pll.png')" }}
>
      
      {/* Panel izquierdo - Imagen */}

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
          <Link href="./" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          
          {!modoRegistro ? (
            <>
              {/* Encabezado Login */}
<div className="mb-8 text-center">
  <h2 className="text-3xl font-bold text-slate-900 mb-2">Inicia Sesión</h2>
  <p className="text-slate-600">Ingrese sus credenciales para acceder</p>
</div>


              {/* Formulario Login */}
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-slate-700 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    id="correo"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
                    placeholder="usuario@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white text-slate-900"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                  </div>
                )}

<button
  type="submit"
  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
>
  Ingresar
</button>

              </form>

              <div className="mt-6 space-y-4 text-center">
                <button
                  onClick={() => router.push("/recuperar/[rol]")}
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors block"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <button
                  onClick={() => setModoRegistro(true)}
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                >
                  ¿No tienes cuenta? Regístrate
                </button>
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
            </>
          ) : (
            <>
              {/* Encabezado Registro */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Regístrate</h2>
                <p className="text-slate-600">Crea tu cuenta para comenzar</p>
              </div>

              {/* Formulario Registro */}
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
                    <input
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="usuario@email.com"
                      required
                    />
                  </div>
<div>
  <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
  <input
    type="password"
    value={contraseña}
    onChange={(e) => setContraseña(e.target.value)}
    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-sm
      ${contraseña.length > 0 && contraseña.length < 10 
        ? "border-red-500 focus:ring-red-500" 
        : "border-slate-300 focus:ring-slate-500"}`}
    placeholder="••••••••••"
    required
    minLength={10}
    maxLength={10}
  />
  {contraseña.length > 0 && contraseña.length < 10 && (
    <p className="text-red-500 text-xs mt-1">
     debe tener exactamente 10 caracteres.
    </p>
  )}
</div>

<div>
  <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar contraseña</label>
  <input
    type="password"
    value={confirmarContraseña}
    onChange={(e) => setConfirmarContraseña(e.target.value)}
    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-sm
      ${confirmarContraseña.length > 0 && confirmarContraseña.length < 10 
        ? "border-red-500 focus:ring-red-500" 
        : "border-slate-300 focus:ring-slate-500"}`}
    placeholder="••••••••••"
    required
    minLength={10}
    maxLength={10}
  />
  {confirmarContraseña.length > 0 && confirmarContraseña.length < 10 && (
    <p className="text-red-500 text-xs mt-1">
       debe tener exactamente 10 caracteres.
    </p>
  )}
</div>


                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de documento</label>
                    <select
                      value={tipoDocumento}
                      onChange={(e) => setTipoDocumento(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="cc">Cédula de Ciudadanía</option>
                      <option value="ti">Tarjeta de Identidad</option>
                      <option value="pp">Pasaporte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Número de documento</label>
                    <input
                      type="text"
                      value={numeroDocumento}
                      onChange={(e) => setNumeroDocumento(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="12345678"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                  </div>
                )}

<button
  type="submit"
  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 mt-6"
>
  Registrarse
</button>

              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setModoRegistro(false)}
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}