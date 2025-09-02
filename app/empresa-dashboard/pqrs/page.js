"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PqrsPage() {
  const [user, setUser] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
   const [sidebarOpen, setSidebarOpen] = useState(true);
  const [misPqrs, setMisPqrs] = useState([]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { icon: "/casita.png", label: "INICIO", path: "/empresa-dashboard" },
    { icon: "/postulacion.png", label: "CANDIDATOS", path: "/empresa-dashboard/postulaciones" },
    { icon: "/pqr.png", label: "PQRS", path: "/empresa-dashboard/pqrs" },
    { icon: "/archivito.png", label: "OFERTAS", path: "/empresa-dashboard/ofertas" },
  ];

  // ✅ Validar rol
  useEffect(() => {
    const data = getUserData();
    if (!data) {
      router.push("/"); 
      return;
    }
    if (data.rol !== "usuario" && data.rol !== "empresa") {
      router.push("/");
      return;
    }
    setUser(data);
    fetchMisPQRS(data.id || data._id);
  }, [router]);

  // ✅ Obtener PQRS
  const fetchMisPQRS = async (id) => {
    try {
      const res = await fetch(`/api/pqrs?usuarioId=${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMisPqrs(data);
    } catch (error) {
      console.error("Error cargando PQRS:", error);
    }
  };

  // ✅ Enviar PQRS
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!motivo || !tipo || !descripcion) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch("/api/pqrs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: user.id || user._id,
          rol: user.rol,
          correo: user.correo,
          motivo,
          tipo,
          descripcion,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("PQRS enviada correctamente ✅");
      setMotivo("");
      setTipo("");
      setDescripcion("");
      fetchMisPQRS(user.id || user._id);
    } catch (error) {
      console.error("Error enviando PQRS:", error);
      alert("No se pudo enviar la PQRS");
    }
  };

  if (!user) return null;

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🔹 Header superior */}
<header className="flex items-center justify-between h-16 px-8 
  bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 
  shadow-lg backdrop-blur-md fixed top-0 left-0 right-0 z-50
  border-b border-purple-400/30">        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <span className="text-white font-extrabold text-xl tracking-wider">
            PLESHMARK
          </span>
        </div>


<div className="flex items-center gap-4">
  <div className="relative group">
    {/* Efecto de glow animado */}
    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-30 group-hover:opacity-70 blur-sm animate-pulse"></div>
    
    {/* Badge principal con efectos múltiples */}
    <span className="relative flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-full 
                   bg-gradient-to-r from-purple-500/80 via-purple-600/80 to-indigo-600/80 
                   backdrop-blur-xl border border-white/30 shadow-2xl
                   hover:shadow-purple-500/25 hover:scale-105 hover:border-white/50
                   transition-all duration-300 ease-out
                   before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                   before:from-white/10 before:via-transparent before:to-white/10 before:opacity-0 
                   hover:before:opacity-100 before:transition-opacity before:duration-300">
      
      {/* Ícono animado */}
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-ping"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 absolute"></div>
      
      {/* Texto con efecto shimmer */}
      <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent 
                     hover:from-purple-100 hover:via-white hover:to-purple-100 transition-all duration-300">
        Rol: {user.rol}
      </span>
      
      {/* Partículas flotantes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
        <div className="absolute w-1 h-1 bg-white/40 rounded-full animate-bounce" 
             style={{top: '20%', left: '15%', animationDelay: '0s', animationDuration: '2s'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-purple-200/50 rounded-full animate-bounce" 
             style={{top: '60%', right: '20%', animationDelay: '0.5s', animationDuration: '1.5s'}}></div>
        <div className="absolute w-1 h-1 bg-indigo-200/30 rounded-full animate-bounce" 
             style={{bottom: '25%', left: '70%', animationDelay: '1s', animationDuration: '1.8s'}}></div>
      </div>
      
      {/* Efecto de brillo que se mueve */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 ease-in-out"></div>
    </span>
    
    {/* Ondas expansivas en hover */}
    <div className="absolute inset-0 rounded-full border-2 border-purple-400/20 opacity-0 group-hover:opacity-100 
                  animate-ping group-hover:animate-none transition-opacity duration-300"></div>
  </div>
</div>
      </header>

      <div className="flex flex-1 pt-14">
<aside className="w-64 bg-gradient-to-b from-purple-800 to-indigo-900 backdrop-blur-xl border-r border-white/20 flex flex-col justify-between py-6 shadow-xl fixed left-0 top-14 bottom-0">

  {/* Header empresa */}
  {sidebarOpen && (
    <div className="text-center px-4 mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
        <h2 className="text-white text-2xl font-semibold drop-shadow-lg text-center break-words leading-tight max-w-[150px] mx-auto">{user.nombreEmpresa}</h2>
        <p className="text-white/70 text-sm mt-1 truncate">NIT: {user.nit}</p>
      </div>
    </div>
  )}

  {/* Menú */}
  <nav className="flex flex-col gap-3 px-2">
    {menuItems.map((item, index) => (
      <button
        key={index}
        onClick={() => {
          if (item.label === "PQRS") router.push("/empresa-dashboard/pqrs");
          else if (item.label === "INICIO") router.push("/empresa-dashboard");
          else if (item.label === "CANDIDATOS") router.push("/empresa-dashboard/postulaciones");
          else if (item.label === "OFERTAS") router.push("/empresa-dashboard/ofertas");
        }}
        className="relative group flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 w-full text-left"
      >
        {/* Ícono con efecto hover */}
        <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300 shadow-sm">
          <Image
            src={item.icon}
            alt={item.label}
            width={24}
            height={24}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
      </button>
    ))}
  </nav>

  {/* Botón cerrar sesión */}
  <div className="px-4 mt-4">
    <button
      onClick={() => {
        localStorage.removeItem("userData");
        router.replace("/empresa-login");
      }}
      className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 
                 py-2 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <div className="flex items-center justify-center gap-2">
        <span></span>
        <span className="text-sm">Cerrar Sesión</span>
      </div>
    </button>
  </div>

</aside>

        {/* 🔹 Contenido principal con scroll */}
<main className="flex-1 ml-64 p-8 bg-gradient-to-br from-slate-50 via-gray-50 to-purple-50/30 overflow-y-auto min-h-screen">
  {/* Header mejorado */}
  <div className="mb-10">
    <div className="flex items-center justify-between gap-4 mb-3">
  {/* Icono + título + descripción */}
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
    <div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-700 bg-clip-text text-transparent">
        Enviar PQRS
      </h1>
      <p className="text-gray-600 font-medium">
        Sistema de Peticiones, Quejas, Reclamos y Sugerencias
      </p>
    </div>
  </div>

  {/* Botón Ayuda alineado a la derecha */}
  <button
    onClick={() => setIsHelpOpen(true)}
    className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-indigo-100 
               text-purple-800 font-bold px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl
               border-2 border-purple-200/50 hover:border-purple-300/70
               transform hover:scale-110 hover:-rotate-1 active:scale-95 active:rotate-0
               transition-all duration-300 ease-out
               before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400/0 
               before:via-purple-400/10 before:to-purple-400/0 before:translate-x-[-100%] 
               hover:before:translate-x-[100%] before:transition-transform before:duration-700
               after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t 
               after:from-transparent after:via-white/20 after:to-white/40 after:opacity-0 
               hover:after:opacity-100 after:transition-opacity after:duration-300"
  >
    <span className="relative flex items-center gap-3 z-10">
      <div className="relative">
        <div className="absolute inset-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 
                      rounded-full animate-pulse opacity-20 group-hover:opacity-40 scale-110"></div>
        <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full 
                      flex items-center justify-center text-white font-black text-sm
                      group-hover:rotate-12 group-hover:scale-110 transition-all duration-300
                      shadow-lg group-hover:shadow-xl">
          ?
        </div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full 
                      animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{animationDelay: '0.1s'}}></div>
        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-400 rounded-full 
                      animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{animationDelay: '0.3s'}}></div>
      </div>
      <span className="bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-800 bg-clip-text text-transparent
                     group-hover:from-purple-900 group-hover:via-indigo-800 group-hover:to-purple-900
                     transition-all duration-300 tracking-wide">
        Ayuda
      </span>
    </span>
  </button>
</div>

    <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
  </div>

  {/* Formulario mejorado */}
  <form
    onSubmit={handleSubmit}
    className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-200/50 mb-12 relative overflow-hidden"
    style={{
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.9)",
    }}
  >
    {/* Patrón decorativo */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/20 pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full -translate-y-20 translate-x-20"></div>
    
    <div className="relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Campo Motivo */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Motivo
          </label>
          <div className="relative group">
            <input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
              placeholder="Ej: Problema con la plataforma"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-focus-within:from-purple-500/5 group-focus-within:to-indigo-500/5 pointer-events-none transition-all duration-300"></div>
          </div>
        </div>

        {/* Campo Tipo */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Tipo
          </label>
          <div className="relative group">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-gray-300 appearance-none cursor-pointer"
            >
              <option value="">Selecciona un tipo</option>
              <option value="petición">Petición</option>
              <option value="queja">Queja</option>
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Campo Descripción */}
      <div className="mt-8 space-y-3">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          Descripción
        </label>
        <div className="relative group">
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-gray-300 resize-none"
            rows="5"
            placeholder="Explica tu situación de manera detallada..."
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 to-indigo-500/0 group-focus-within:from-purple-500/5 group-focus-within:to-indigo-500/5 pointer-events-none transition-all duration-300"></div>
        </div>
      </div>

      {/* Botón de envío */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Enviar PQRS</span>
        </button>
      </div>
    </div>
  </form>

  {/* Header del listado mejorado */}
  <div className="mb-8">
    <div className="flex items-center gap-4 mb-3">
      <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-purple-800 bg-clip-text text-transparent">
          Mis PQRS
        </h2>
        <p className="text-gray-600 font-medium">Historial de solicitudes enviadas</p>
      </div>
    </div>
    <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
  </div>

  {/* Tabla mejorada */}
  <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800">
          <tr>
            <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6.5a3 3 0 01-3 3h-7a3 3 0 01-3-3V5zm8 8a1 1 0 10-2 0v2a1 1 0 102 0v-2z" clipRule="evenodd"/>
                </svg>
                Motivo
              </div>
            </th>
            <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
                Tipo
              </div>
            </th>
            <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Estado
              </div>
            </th>
            <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
                Respuesta
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {misPqrs.length > 0 ? (
            misPqrs.map((p, i) => (
              <tr
                key={p._id}
                className={`${
                  i % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                } hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/30 transition-all duration-300 group`}
              >
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                    {p.motivo}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 capitalize">
                    {p.tipo}
                  </div>
                </td>
                <td className="px-8 py-6">
                  {p.estado === "pendiente" ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      Pendiente
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Respondido
                    </div>
                  )}
                </td>
                <td className="px-8 py-6">
                  <div className="text-gray-700 group-hover:text-gray-900 transition-colors max-w-xs">
                    {p.respuesta ? (
                      <span className="font-medium">{p.respuesta}</span>
                    ) : (
                      <span className="text-gray-500 italic">Sin respuesta aún</span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-16">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-600 mb-1">Aún no has enviado PQRS</p>
                    <p className="text-gray-500">Utiliza el formulario de arriba para enviar tu primera solicitud</p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  {isHelpOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
    <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-4xl p-0 relative overflow-hidden border border-gray-100">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 px-6 py-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-6 translate-x-6"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-2 -translate-x-2"></div>

        {/* Botón cerrar */}
        <button
          onClick={() => setIsHelpOpen(false)}
          className="absolute top-3 right-3 w-7 h-7 bg-white/20 hover:bg-white/30 backdrop-blur-sm
                   rounded-full flex items-center justify-center text-white hover:text-red-300
                   transition-all duration-200 hover:scale-110 group"
        >
          <span className="text-base font-light group-hover:rotate-90 transition-transform duration-200">✕</span>
        </button>

        {/* Título */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1 text-white">
            ¡Hola <span className="text-yellow-300 font-extrabold">"{user.nombreEmpresa}"</span>!
          </h2>
          <p className="text-purple-100 text-xs font-medium">Tus PQRS son importantes para nosotros</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Tarjeta Respuesta PQRS */}
          <div className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 
                        p-4 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg 
                            flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">📧</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-blue-700 transition-colors">
                  PQRS Atendidas
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  En Pleshmark nos aseguramos de responder tus peticiones, quejas y sugerencias de manera rápida y efectiva.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta Atención Personal */}
          <div className="group hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 
                        p-4 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg 
                            flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">🤝</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-purple-700 transition-colors">
                  Atención Personalizada
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Tu experiencia es importante: revisamos cada PQRS con detalle y nos aseguramos de ofrecer soluciones claras.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta Transparencia */}
          <div className="group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 
                        p-4 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-emerald-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg 
                            flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">📌</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-emerald-700 transition-colors">
                  Seguimiento
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Cada PQRS registrada puede ser seguida: te mantenemos informado sobre su estado hasta la resolución.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-3 flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full 
                          flex items-center justify-center shadow-sm">
              <span className="text-white text-xs">💡</span>
            </div>
            <p className="text-gray-700 text-xs">
              <span className="font-semibold">Recuerda:</span> Tu voz es importante para Pleshmark.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

</main>

      </div>
    </div>
  );
}
