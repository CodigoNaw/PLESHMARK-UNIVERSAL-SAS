"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UsuariosPage() {
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]); // ✅ Cambiado a plural
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filtros, setFiltros] = useState({ search: "" });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchInput, setSearchInput] = useState("");
 const [isHelpOpen, setIsHelpOpen] = useState(false);

  const router = useRouter();
  const limit = 9;

  const menuItems = [
    { icon: "/casita.png", label: "INICIO", path: "/empresa-dashboard" },
    { icon: "/postulacion.png", label: "CANDIDATOS", path: "/empresa-dashboard/postulaciones" },
    { icon: "/pqr.png", label: "PQRS", path: "/empresa-dashboard/pqrs" },
    { icon: "/archivito.png", label: "OFERTAS", path: "/empresa-dashboard/ofertas" },
  ];

  // ✅ Validar rol y obtener datos del usuario
  useEffect(() => {
    const data = getUserData();
    if (!data) return router.push("/");
    if (!["usuario","empresa"].includes(data.rol)) return router.push("/");
    setUser(data);
  }, [router]);

  // Debounce para búsqueda en vivo
  useEffect(() => {
    const handler = setTimeout(() => {
      setFiltros({ search: searchInput });
      setPage(1); // Reinicia página al filtrar
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // Fetch usuarios según filtros y paginación
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const params = new URLSearchParams({
          page,
          limit,
          search: filtros.search || ""
        });

        const res = await fetch(`/api/usuario?${params.toString()}`);
        const data = await res.json();

        setUsuarios(Array.isArray(data.usuario) ? data.usuario : []); // ✅ Consistente
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        setUsuarios([]);
        setTotal(0);
      }
    };

    fetchUsuarios();
  }, [page, filtros]);

  if (!user) return null;

  return (
    <div className="h-screen flex flex-col bg-cover bg-center">
      {/* 🔹 Header superior */}
      <header className="flex items-center justify-between h-16 px-8 
        bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 
        shadow-lg backdrop-blur-md fixed top-0 left-0 right-0 z-50
        border-b border-purple-400/30">
        <div className="flex items-center gap-2">
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
        {/* 🔹 Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-purple-800 to-indigo-900 backdrop-blur-xl border-r border-white/20 flex flex-col justify-between py-6 shadow-xl fixed left-0 top-14 bottom-0">
          {sidebarOpen && (
            <div className="text-center px-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
                <h2 className="text-white text-2xl font-semibold drop-shadow-lg text-center break-words leading-tight max-w-[150px] mx-auto">
                  {user.nombreEmpresa || user.nombre}
                </h2>
                {user.nit && <p className="text-white/70 text-sm mt-1 truncate">NIT: {user.nit}</p>}
              </div>
            </div>
          )}
          <nav className="flex flex-col gap-3 px-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className="relative group flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 w-full text-left"
              >
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
                <span className="text-sm">Cerrar Sesión</span>
              </div>
            </button>
          </div>
        </aside>

        {/* 🔹 Contenido principal */}
<main className="flex-1 ml-64 p-8 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-100/40 overflow-y-auto min-h-screen relative">
  {/* Elementos decorativos de fondo */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-cyan-500/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-400/5 to-violet-500/5 rounded-full blur-3xl"></div>
  </div>

  {/* Contenido principal */}
  <div className="relative z-10">
    {/* Header con título */}
<div className="mb-8">
  <div className="flex items-center gap-4 mb-2">
    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2M4 1h16v2H4V1m16 16c0 1.11-.89 2-2 2s-2-.89-2-2 .89-2 2-2 2 .89 2 2M12 13c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2"/>
      </svg>
    </div>

    <div className="flex-1">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
        Directorio de Talentos
      </h1>
      <p className="text-gray-600 font-medium">Descubre profesionales excepcionales</p>
    </div>

    <button
      onClick={() => setIsHelpOpen(true)}
      className="ml-auto group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-indigo-100 
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
        {/* contenido del botón */}
        <span>🔎Ayuda</span>
      </span>
    </button>
  </div>
</div>


    {/* 🔎 Filtros Ultra Pro */}
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl shadow-indigo-500/10">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por ID, especialidad..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl 
                       text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 
                       focus:border-indigo-500/50 transition-all duration-300 shadow-lg shadow-gray-500/5
                       hover:bg-white/80 hover:shadow-xl hover:shadow-gray-500/10"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center opacity-80">
                <span className="text-white text-xs font-bold">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 🃏 Cards Ultra Premium */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {usuarios.map((u, index) => (
        <div 
          key={u._id} 
          className="group relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 
                   shadow-2xl shadow-indigo-500/10 hover:shadow-3xl hover:shadow-indigo-600/20 
                   transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]
                   before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/5 before:to-purple-600/5 
                   before:rounded-3xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          {/* Elemento decorativo superior */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-bl-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          {/* Badge de especialidad */}
<div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
  {u.especialidad || "No definida"}
</div>


          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Avatar premium con efectos */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-110"></div>
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <img 
                  src={u.foto || "/default-avatar.png"} 
                  alt={u.nombre} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Indicador online */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 border-3 border-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Información del usuario */}
            <div className="mb-6 space-y-3">
              <h3 className="font-black text-2xl bg-gradient-to-r from-gray-800 to-indigo-800 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
                {u.nombre}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="font-medium text-sm">{u.correo}</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="font-medium text-sm">{u.telefono}</span>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-full">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                </svg>
                <span className="font-bold text-indigo-700 text-sm">{u.especialidad}</span>
              </div>
            </div>

            {/* Botones de acción premium */}
            <div className="w-full space-y-3">
              {u.pdfCurriculum && (
                <a
                  href={u.pdfCurriculum}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 
                           text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-600/40
                           transition-all duration-300 hover:scale-105 hover:from-indigo-700 hover:to-purple-800 group/btn"
                >
                  <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <span>Descargar CV</span>
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                </a>
              )}
              
              <button
                onClick={() => console.log("Contactar a:", u.nombre)}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 
                         text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-600/40
                         transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-green-700 group/btn"
              >
                <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
                <span>Contactar</span>
                <div className="w-2 h-2 bg-emerald-200 rounded-full animate-bounce"></div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* 📄 Paginación Ultra Premium */}
    <div className="flex items-center justify-center gap-6">
      <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-4 shadow-2xl shadow-indigo-500/10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 
                     font-bold rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed 
                     hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 hover:shadow-lg
                     transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
            </svg>
            <span>Anterior</span>
          </button>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold rounded-2xl shadow-xl">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <span>Página {page}</span>
          </div>
          
          <button
            onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
            disabled={page * limit >= total}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 
                     font-bold rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed
                     hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 hover:shadow-lg
                     transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
          >
            <span>Siguiente</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
{isHelpOpen && (
<div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[999]">
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] w-[90%] max-w-4xl p-0 relative overflow-hidden border border-white/40">

      <div className="max-h-[90vh] overflow-y-auto"></div>
      {/* Header Ultra Premium */}
      <div className="relative bg-gradient-to-r from-violet-600 via-indigo-700 to-cyan-700 px-6 py-4 overflow-hidden">       {/* Efectos de fondo complejos */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-8"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/8 to-transparent rounded-full translate-y-6 -translate-x-6"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute top-2 left-10 w-1 h-1 bg-white/40 rounded-full animate-bounce"></div>
        <div className="absolute top-8 right-20 w-1 h-1 bg-yellow-300/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-4 left-20 w-1 h-1 bg-cyan-300/50 rounded-full animate-pulse"></div>

        {/* Botón cerrar futurista */}
        <button
          onClick={() => setIsHelpOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-lg
                   rounded-2xl flex items-center justify-center text-white hover:text-red-300
                   transition-all duration-300 hover:scale-110 hover:rotate-180 group border border-white/30
                   shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>

        {/* Título megatron */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center border border-white/30 shadow-xl">
            <span className="text-3xl animate-bounce">🚀</span>
          </div>
          <div>
            <h2 className="text-3xl font-black mb-1 text-white leading-tight">
              ¡Explora el <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent font-extrabold px-2 py-1 bg-white/20 rounded-xl backdrop-blur-sm">Directorio de Talentos</span>!
            </h2>
            <p className="text-indigo-100 text-sm font-semibold tracking-wide">
              Aquí puedes encontrar usuarios con las habilidades y características que tu empresa busca
            </p>
          </div>
        </div>
      </div>

      {/* Contenido con glassmorphism */}
<div className="px-3 py-3 bg-gradient-to-b from-white/90 to-gray-50/80 backdrop-blur-sm">
        
        {/* Grid de consejos ultra premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Tarjeta 1 Ultra */}

          {/* Tarjeta 2 Ultra */}


          {/* Tarjeta 3 Ultra */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/50 to-teal-100/30 rounded-bl-[4rem] 
                          opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-110"></div>
            
            <div className="relative z-10">
              

            </div>
          

        </div>

        {/* Sección adicional ultra pro */}
        <div className="bg-gradient-to-r from-slate-50/80 via-indigo-50/60 to-purple-50/80 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-inner">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl blur opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl 
                            flex items-center justify-center shadow-2xl">
                <span className="text-white text-3xl animate-bounce">💡</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="font-black text-2xl mb-2 bg-gradient-to-r from-gray-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Estrategia de Reclutamiento
            </h3>
            <p className="text-gray-600 font-medium">Maximiza tu eficiencia en la búsqueda de talento</p>
          </div>

          {/* Grid de micro-consejos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-2">Definición Clara</h4>
              <p className="text-gray-600 text-xs leading-relaxed">Establece criterios específicos antes de iniciar tu búsqueda</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-2">Evaluación Rápida</h4>
              <p className="text-gray-600 text-xs leading-relaxed">Revisa currículums de forma eficiente y estructurada</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-2">Contacto Efectivo</h4>
              <p className="text-gray-600 text-xs leading-relaxed">Establece comunicación profesional desde el primer contacto</p>
            </div>
          </div>
        </div>

        {/* Footer premium con estadísticas */}
      </div>
    </div>
  </div>
)}

</main>
      </div>
    </div>
  );
}
