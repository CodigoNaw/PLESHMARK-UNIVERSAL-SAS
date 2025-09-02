"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [fotoPreview, setFotoPreview] = useState(null);
   const [loading, setLoading] = useState(false); // 🚨 loading


  // Estado CRUD
  const [registros, setRegistros] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // 🔹 Subir foto
  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFotoPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("id", user.id || user._id);

    setLoading(true);
    try {
      const res = await fetch("/api/administrador/foto", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir foto");

      const updatedUser = { ...user, foto: data.foto };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      setFotoPreview(data.foto);
    } catch (err) {
      console.error("Error subiendo foto:", err);
      alert("Error al subir foto");
    } finally {
      setLoading(false);
    }
  };

  // Validar usuario
  useEffect(() => {
    const data = getUserData();
    if (!data) {
      router.push("/administrador-login");
      return;
    }
    if (data.rol !== "admin") {
      if (data.rol === "usuario") router.push("/usuario-dashboard");
      if (data.rol === "empresa") router.push("/empresa-dashboard");
      return;
    }
    setUser(data);
    setFotoPreview(data.foto || null);
  }, [router]);

  useEffect(() => {
    if (user?.rol === "admin") {
      fetchRegistros();
    }
  }, [page, busqueda, user]);

  const fetchRegistros = async () => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      if (busqueda) params.append("search", busqueda);

      const res = await fetch(`/api/admin/todos?${params.toString()}`);
      if (!res.ok) throw new Error("Error al cargar datos");

      const data = await res.json();
      setRegistros(Array.isArray(data.registros) ? data.registros : []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
      setRegistros([]);
      setTotalPages(1);
    }
  };

  if (!user) return null;

  return (
    <div className="h-screen flex flex-col">
      {/* 🔹 Header superior (traído de PQRS) */}
<header className="flex items-center justify-between h-16 px-8 
  bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 
  shadow-lg backdrop-blur-md fixed top-0 left-0 right-0 z-50
  border-b border-purple-400/30">
  
  {/* Título */}
  <h1 className="text-white font-extrabold text-2xl tracking-wide drop-shadow-sm">
    Panel de <span className="text-purple-200">Administrador</span>
  </h1>
  
  {/* Info de usuario */}
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


      <div className="flex flex-1 pt-16">
        {/* 🔹 Sidebar fijo (traído de PQRS) */}
<aside className="w-56 bg-gradient-to-b from-indigo-900/95 via-purple-800/90 to-pink-900/95 
  flex flex-col items-center py-6 justify-between 
  rounded-r-2xl fixed left-0 top-16 bottom-0 
  shadow-xl border-r border-white/10 backdrop-blur-md">          <div className="flex flex-col items-center">
            {/* Foto perfil */}
            <div className="bg-gray-100 rounded-full p-2 mb-4 border-4 border-purple-600">
              <label className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
                {fotoPreview || user.foto ? (
                  <img
                    src={fotoPreview || user.foto}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm text-center px-2">
                    Subir foto
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Datos usuario */}
            <p className="text-white text-2xl font-bold mb-1">{user.nombre}</p>
            <span className="text-purple-200 text-sm">
              CC: {user.numeroDocumento}
            </span>
            <span className="text-purple-200 text-sm mb-4">
              Rol: {user.rol}
            </span>

            <button
              onClick={() => router.push("/admin-dashboard/pqrs")}
              className="mt-2 w-40 bg-white px-6 py-2 rounded-full font-semibold text-purple-900 shadow-md hover:shadow-xl transition-all duration-300"
            >
              PQRS
            </button>

            <button
              onClick={() => router.push("/admin-dashboard")}
              className="mt-2 w-40 bg-white px-6 py-2 rounded-full font-semibold text-purple-900 shadow-md hover:shadow-xl transition-all duration-300"
            >
              Panel Admin
            </button>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center gap-3 mb-4">
<button
  onClick={() => {
    // 1️⃣ Limpiar almacenamiento local
    localStorage.removeItem("userData");
    sessionStorage.clear();

    // 2️⃣ Limpiar estado del usuario
    setUser(null);

    // 3️⃣ Redirigir al login
    router.replace("/administrador-login");
  }}
  className="group relative w-full bg-gradient-to-r from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 px-6 py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-red-400/50 hover:border-red-300/70 hover:scale-[1.02]"
>
  <span className="relative z-10">Cerrar Sesión</span>
  <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-red-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</button>

            <p className="text-purple-200 text-sm">@Pleshmark</p>
          </div>
        </aside>

        {/* 🔹 Contenido principal (tu CRUD original) */}
<main className="flex-1 ml-52 p-8 overflow-y-auto bg-gradient-to-br from-slate-50 via-gray-50 to-purple-50/30 min-h-screen">
          {/* Header mejorado */}
<div className="mb-10">
  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-50/40 via-transparent to-indigo-50/20 pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -translate-y-16 translate-x-16"></div>
    
    {/* 🔹 contenedor principal con justify-between para separar texto y botón */}
    <div className="relative z-10 flex items-center justify-between gap-4">
      
      {/* Icono + texto */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-700 bg-clip-text text-transparent leading-tight">
            Gestión de Registros - PLESHMARK
          </h1>
          <p className="text-gray-600 font-medium mt-1">Panel de administración y control de usuarios</p>
        </div>
      </div>

      {/* 🔹 Botón al lado derecho */}
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
  {/* Ícono de interrogación animado */}
  <span className="relative flex items-center gap-3 z-10">
    <div className="relative">
      {/* Círculo de fondo con pulso */}
      <div className="absolute inset-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 
                    rounded-full animate-pulse opacity-20 group-hover:opacity-40 scale-110"></div>
      
      {/* Ícono de interrogación */}
      <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full 
                    flex items-center justify-center text-white font-black text-sm
                    group-hover:rotate-12 group-hover:scale-110 transition-all duration-300
                    shadow-lg group-hover:shadow-xl">
        ?
      </div>
      
      {/* Partículas alrededor del ícono */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full 
                    animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{animationDelay: '0.1s'}}></div>
      <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-400 rounded-full 
                    animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{animationDelay: '0.3s'}}></div>
    </div>
    
    {/* Texto con efectos */}
    <span className="bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-800 bg-clip-text text-transparent
                   group-hover:from-purple-900 group-hover:via-indigo-800 group-hover:to-purple-900
                   transition-all duration-300 tracking-wide">
      Ayuda
    </span>
  </span>
  
  {/* Ondas en los bordes */}
  <div className="absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 
                transition-opacity duration-500 pointer-events-none">
    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-purple-400/50 rounded-tl-lg
                  animate-pulse"></div>
    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-indigo-400/50 rounded-br-lg
                  animate-pulse" style={{animationDelay: '0.2s'}}></div>
  </div>
  
  {/* Efecto de destellos */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                w-0 h-0 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 
                group-hover:w-full group-hover:h-full transition-all duration-500 -z-10"></div>
  
  {/* Sombra interior dinámica */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-purple-900/5
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</button>
    </div>

    <div className="h-1 w-40 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mt-4"></div>
  </div>
</div>


          {/* Buscador mejorado */}
          <div className="mb-8">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-800">Filtros de Búsqueda</h2>
              </div>
              
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Buscar por nombre, correo, identificación..."
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPage(1);
                  }}
                  className="w-full max-w-md border-2 border-gray-200 px-5 py-3 pl-12 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla mejorada */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden mb-8">
            <div
              className="overflow-x-auto"
              style={{ maxWidth: "1453px" }}
            >
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800">
                  <tr>
                    <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                        </svg>
                        ID
                      </div>
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                        Nombre
                      </div>
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                        </svg>
                        Identificación
                      </div>
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        Correo
                      </div>
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                        </svg>
                        Rol
                      </div>
                    </th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">

                        Acciones
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Array.isArray(registros) && registros.length > 0 ? (
                    registros.map((r, idx) => (
                      <tr
                        key={r.id}
                        className={`group transition-all duration-300 ${
                          idx % 2 === 0
                            ? "bg-gray-50/50 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/30"
                            : "bg-white hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-indigo-50/20"
                        }`}
                      >
<td className="px-8 py-5">
  <div className="inline-flex items-center px-1 py-1 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
    <span className="font-mono text-xs text-gray-600 font-medium">
      {r.id ? `${r.id.slice(0, 6)}...${r.id.slice(-5)}` : "N/A"}
    </span>
  </div>
</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                                {r.nombre}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                            {r.identificacion}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                              {r.correo}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                                r.rol === "admin"
                                  ? "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-200 group-hover:from-red-200 group-hover:to-red-300"
                                  : r.rol === "empresa"
                                  ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-200 group-hover:from-blue-200 group-hover:to-blue-300"
                                  : "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-200 group-hover:from-emerald-200 group-hover:to-emerald-300"
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full ${
                                r.rol === "admin" ? "bg-red-500" : r.rol === "empresa" ? "bg-blue-500" : "bg-emerald-500"
                              }`}></div>
                              {r.rol}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
  <button
    onClick={async () => {
      if (confirm(`¿Seguro que deseas eliminar a ${r.nombre}?`)) {
        try {
          const res = await fetch(`/api/admin/todos?id=${r.id}&rol=${r.rol}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Error al eliminar");

          fetchRegistros(); // 🔄 refresca la tabla
          alert("Eliminado correctamente ✅");
        } catch (err) {
          console.error("Error eliminando:", err);
          alert("No se pudo eliminar");
        }
      }
    }}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
  >
    Eliminar
  </button>
</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-8 py-16 text-center"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-600 mb-1">No se encontraron registros</p>
                            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
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
        {/* Efectos decorativos */}
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
            ¡Hola <span className="text-yellow-300 font-extrabold">"{user?.nombre}"</span>!
          </h2>
          <p className="text-purple-100 text-xs font-medium">Centro de ayuda y guías</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Tarjeta Admin */}
          <div className="group hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 
                        p-4 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg 
                            flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">👑</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-purple-700 transition-colors">
                  Panel de Administrador
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Gestiona usuarios, visualiza registros y elimina cuentas con mal comportamiento.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta PQRS */}
          <div className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 
                        p-4 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg 
                            flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">📧</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-blue-700 transition-colors">
                  Sistema PQRS
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Responde a peticiones, quejas y sugerencias para mejorar la experiencia.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta Perfil */}
          <div className="group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 
                        p-4 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-emerald-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg 
                            flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">⚙️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-emerald-700 transition-colors">
                  Tu Espacio Personal
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Personaliza tu perfil con foto y revisa tu información actual.
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
              <span className="font-semibold">Tip:</span> Usa estas herramientas de manera responsable.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


          {/* Paginación mejorada */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="group flex items-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:shadow-sm transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 px-6 py-3 rounded-xl border border-purple-200">
                  <span className="text-purple-800 font-bold">
                    Página {page} de {totalPages}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="group flex items-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:shadow-sm transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <span>Siguiente</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
