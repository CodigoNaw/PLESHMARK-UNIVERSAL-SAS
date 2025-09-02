"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";

export default function AdminPQRS() {
  const [user, setUser] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [pqrsList, setPqrsList] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [selected, setSelected] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const router = useRouter();

  // 🔹 Subir foto
  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFotoPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("id", user.id || user._id);

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

      alert("Foto actualizada correctamente ✅");
    } catch (err) {
      console.error("Error subiendo foto:", err);
      alert("Error al subir foto");
    }
  };

  // 🔹 Validar admin
  useEffect(() => {
    const data = getUserData();
    if (!data) {
      router.push("/administrador-login");
      return;
    }
    if (data.rol !== "admin") {
      router.push("/");
      return;
    }
    setUser(data);
    setFotoPreview(data.foto || null);
    fetchPQRS();
  }, [router]);

  // 🔹 Cargar PQRS
const fetchPQRS = async () => {
  try {
    const stored = getUserData(); // ya lo usas en useEffect
    const headers = {};
    if (stored?.token) headers.Authorization = `Bearer ${stored.token}`;

    const res = await fetch("/api/pqrs", { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al cargar PQRS");

    // Soporta array o { pqrs } y recorta a 4 por seguridad
    const list = Array.isArray(data) ? data : (data?.pqrs || []);
    setPqrsList(list.slice(0, 4));
  } catch (error) {
    console.error("Error cargando PQRS:", error);
  }
};


  // 🔹 Responder PQRS
  const handleResponder = async () => {
    if (!selected || !respuesta.trim()) return;
    try {
      const res = await fetch("/api/pqrs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected._id, respuesta }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Respuesta enviada ✅");
      setRespuesta("");
      setSelected(null);
      fetchPQRS();
    } catch (error) {
      console.error("Error respondiendo PQRS:", error);
      alert("Error al responder");
    }
  };
  

  if (!user) return null;

  return (
    <div className="h-screen flex flex-col">
      {/* 🔹 Header superior */}
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
        {/* 🔹 Sidebar fijo */}
<aside className="w-56 bg-gradient-to-b from-indigo-900/95 via-purple-800/90 to-pink-900/95 
  flex flex-col items-center py-6 justify-between 
  rounded-r-2xl fixed left-0 top-16 bottom-0 
  shadow-xl border-r border-white/10 backdrop-blur-md">           <div className="flex flex-col items-center">
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
            <span className="text-purple-200 text-sm">CC: {user.numeroDocumento}</span>
            <span className="text-purple-200 text-sm mb-4">Rol: {user.rol}</span>

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

        {/* 🔹 Contenido principal scroll */}
<main className="flex-1 ml-52 p-8 overflow-y-auto bg-gradient-to-br from-slate-50 via-gray-50 to-purple-50/30 min-h-screen">
          {/* Header mejorado */}
          <div className="mb-10">
<div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-purple-50/40 via-transparent to-indigo-50/20 pointer-events-none"></div>
  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -translate-y-16 translate-x-16"></div>
  
  <div className="relative z-10 flex items-center gap-4">
    {/* Ícono principal */}
    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>

    {/* Contenido y botón */}
    <div className="flex-1 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-700 bg-clip-text text-transparent leading-tight">
          Gestión de PQRS
        </h1>
        <p className="text-gray-600 font-medium mt-1">
          Panel administrativo de peticiones, quejas, reclamos y sugerencias
        </p>
      </div>

      {/* Botón a la derecha */}
      <div className="ml-6">
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
    </div>
  </div>
</div>

          </div>

          {/* Tabla mejorada */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                        Usuario
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                        </svg>
                        Rol
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        Correo
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6.5a3 3 0 01-3 3h-7a3 3 0 01-3-3V5zm8 8a1 1 0 10-2 0v2a1 1 0 102 0v-2z" clipRule="evenodd"/>
                        </svg>
                        Motivo
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        Tipo
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Estado
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"/>
                        </svg>
                        Acción
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pqrsList.length > 0 ? (
                    pqrsList.map((p, idx) => (
                      <tr 
                        key={p._id} 
                        className={`group transition-all duration-300 ${
                          idx % 2 === 0 
                            ? "bg-gray-50/50 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/30" 
                            : "bg-white hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-indigo-50/20"
                        }`}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">

                            <div>
<p className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors text-sm">
  {p.usuarioId
    ? `${p.usuarioId.slice(0, 6)}...${p.usuarioId.slice(-4)}`
    : "ID no disponible"}
</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            {p.rol}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm">
                              {p.correo}
                            </span>
                          </div>
                        </td>
<td className="px-4 py-2">
  {p.motivo.length > 10 ? `${p.motivo.slice(0, 10)}...` : p.motivo}
</td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-200 capitalize">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            {p.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-5">
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
                        <td className="px-6 py-5">
                          <button
                            onClick={() => setSelected(p)}
                            className="group/btn relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="text-sm">Ver / Responder</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-600 mb-1">No hay PQRS registradas</p>
                            <p className="text-gray-500">Aún no se han recibido peticiones, quejas, reclamos o sugerencias</p>
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
  <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-2">
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl w-[95%] max-w-3xl relative overflow-hidden border border-white/20">
      
      {/* Header */}
<div className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-indigo-900 px-5 py-4 rounded-b-2xl overflow-hidden shadow-lg">
  {/* Patrones de fondo sutiles */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/15 to-purple-500/15"></div>
    <div className="absolute top-3 right-5 w-24 h-24 border border-white/15 rounded-full blur-sm animate-pulse"></div>
    <div className="absolute bottom-3 left-5 w-20 h-20 border border-white/15 rounded-xl rotate-45 blur-sm"></div>
  </div>

  {/* Botón cerrar */}
<button
  onClick={() => setIsHelpOpen(false)}
  className="absolute top-3 right-3 bg-white/20 hover:bg-red-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/80 hover:text-red-300 transition-transform duration-300 hover:scale-110 p-2 pointer-events-auto"
  aria-label="Cerrar"
>
  <span className="text-base font-medium flex items-center justify-center w-6 h-6">✕</span>
</button>


  {/* Contenido */}
  <div className="relative z-10">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-white text-xl">📋</span>
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Sistema PQRS</h2>
        <p className="text-slate-300 text-sm font-medium">Gestión Profesional de Solicitudes</p>
      </div>
    </div>
    <p className="text-indigo-200 text-sm">
      Bienvenido <span className="text-yellow-300 font-semibold">"{user?.nombre}"</span> - Centro de gestión y buenas prácticas
    </p>
  </div>
</div>


      {/* Contenido */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Importancia PQRS */}
          <div className="space-y-4">

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Impacto en la organización</h3>
                  <ul className="space-y-1 text-xs text-slate-700">
                    <li className="flex items-start gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></span><span><strong>Reputación corporativa:</strong> Fortalece la imagen institucional</span></li>
                    <li className="flex items-start gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></span><span><strong>Satisfacción del usuario:</strong> Aumenta la lealtad y retención</span></li>
                    <li className="flex items-start gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></span><span><strong>Prevención de escalamientos:</strong> Resolución temprana de conflictos</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mejores prácticas */}
          <div className="space-y-4">


            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Tipos de PQRS</h3>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-white/60 rounded-lg p-2 border border-amber-200">
                      <strong className="text-amber-700">Peticiones</strong>
                      <p className="text-slate-600 mt-1">Solicitudes de información o servicios</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-2 border border-amber-200">
                      <strong className="text-amber-700">Quejas</strong>
                      <p className="text-slate-600 mt-1">Manifestaciones de inconformidad</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-2 border border-amber-200">
                      <strong className="text-amber-700">Reclamos</strong>
                      <p className="text-slate-600 mt-1">Exigencias por derechos vulnerados</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-2 border border-amber-200">
                      <strong className="text-amber-700">Sugerencias</strong>
                      <p className="text-slate-600 mt-1">Propuestas de mejoramiento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-lg">💼</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Centro de Excelencia PQRS</h4>
                  <p className="text-slate-600 text-xs">Tu gestión impacta directamente en la satisfacción de usuarios</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-700">15</div>
                <div className="text-xs text-slate-500">Días máx. respuesta</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
)}


          {/* Modal mejorado para responder */}
          {selected && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-3">
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-xl shadow-2xl border border-gray-200/50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -translate-y-16 translate-x-16"></div>
      
      <div className="relative z-10">
        {/* Título */}
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200/80">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
              Responder PQRS
            </h2>
            <p className="text-gray-600 text-sm font-medium">Gestiona la solicitud</p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/50 rounded-xl p-4 mb-5 border border-purple-100/80">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6.5a3 3 0 01-3 3h-7a3 3 0 01-3-3V5zm8 8a1 1 0 10-2 0v2a1 1 0 102 0v-2z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-purple-700 uppercase tracking-wide">Motivo</label>
                <p className="text-gray-800 font-semibold mt-1 text-sm">{selected.motivo}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Descripción</label>
                <p className="text-gray-800 leading-relaxed mt-1 text-sm">{selected.descripcion}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Tu Respuesta
          </label>
          <div className="relative group">
            <textarea
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:outline-none resize-none transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:border-gray-300 min-h-[100px] text-sm"
              rows="4"
              placeholder="Escribe una respuesta profesional..."
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 to-indigo-500/0 group-focus-within:from-purple-500/5 group-focus-within:to-indigo-500/5 pointer-events-none transition-all duration-300"></div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setSelected(null)}
            className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-all duration-300 border border-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleResponder}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span>Enviar</span>
            <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
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
