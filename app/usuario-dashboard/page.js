"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UsuarioDashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    nombre: "",
    numeroDocumento: "",
    correo: "",
    telefono: "",
    especialidad:""
  });
  const router = useRouter();

  const menuItems = [
    { icon: "/casita.png", label: "INICIO", link: "/usuario-dashboard" },
    { icon: "/postulacion.png", label: "CURRICULUM", link: "/usuario-dashboard/curriculum" },
    { icon: "/pqr.png", label: "PQRS", link: "/usuario-dashboard/pqrs" },
    { icon: "/archivito.png", label: "OFERTAS", link: "/usuario-dashboard/ofertas" },
  ];

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    if (savedState !== null) {
      setSidebarOpen(savedState === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", sidebarOpen);
  }, [sidebarOpen]);

  useEffect(() => {
    const data = getUserData();
    if (!data) {
      router.push("/usuario-login");
      return;
    }
    if (data.rol !== "usuario") {
      if (data.rol === "empresa") router.push("/empresa-dashboard");
      if (data.rol === "admin") router.push("/admin-dashboard");
      return;
    }
    setUser(data);
    setPreview(data.foto || null);
  }, [router]);

  // Manejo de subida de foto
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setPreview(URL.createObjectURL(file));

  const formData = new FormData();
  formData.append("foto", file);
  formData.append("id", user.id || user._id);

  setLoading(true);
  try {
    const res = await fetch("/api/usuario/foto", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al subir foto");

    const updatedUsuario = { ...user, foto: data.foto };
    setUser(updatedUsuario);
    localStorage.setItem("userData", JSON.stringify(updatedUsuario));
    setPreview(data.foto);
  } catch (err) {
    console.error("Error subiendo foto:", err);
    alert("Error al subir foto");
  } finally {
    setLoading(false);
  }
};

  // Abrir modal con datos actuales
  const openEditModal = () => {
    setEditData({
      nombre: user.nombre || "",
      numeroDocumento: user.numeroDocumento || "",
      correo: user.correo || "",
      telefono: user.telefono || "",
      especialidad: user.especialidad || ""
    });
    setIsModalOpen(true);
  };

  // Guardar cambios del usuario
const handleSaveUsuario = async () => {
  try {
    const res = await fetch("/api/usuario/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id || user._id, ...editData })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al actualizar");

    setUser(data.usuario);
    localStorage.setItem("userData", JSON.stringify(data.usuario));

    setIsModalOpen(false);
    alert("Información actualizada correctamente");
  } catch (err) {
    console.error("Error actualizando usuario:", err);
    alert("No se pudo actualizar la información");
  }
};

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-100">
      {/* Header Profesional */}
<header className="flex items-center justify-between h-16 px-8 
  bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 
  shadow-lg backdrop-blur-md fixed top-0 left-0 right-0 z-50
  border-b border-purple-400/30">
  
  {/* Logo y nombre */}
  <div className="flex items-center gap-2">
    <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-xl shadow-md object-cover"/>
    <span className="text-white font-extrabold text-xl tracking-wider">
      PLESHMARK
    </span>
  </div>

  {/* Rol y toggle sidebar */}
  <div className="flex items-center gap-4">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-30 group-hover:opacity-70 blur-sm animate-pulse"></div>
      <span className="relative flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-full 
                     bg-gradient-to-r from-purple-500/80 via-purple-600/80 to-indigo-600/80 
                     backdrop-blur-xl border border-white/30 shadow-2xl
                     hover:shadow-purple-500/25 hover:scale-105 hover:border-white/50
                     transition-all duration-300 ease-out
                     before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                     before:from-white/10 before:via-transparent before:to-white/10 before:opacity-0 
                     hover:before:opacity-100 before:transition-opacity before:duration-300">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-ping"></div>
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 absolute"></div>
        <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent 
                       hover:from-purple-100 hover:via-white hover:to-purple-100 transition-all duration-300">
          {user.rol}
        </span>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
          <div className="absolute w-1 h-1 bg-white/40 rounded-full animate-bounce" 
               style={{top: '20%', left: '15%', animationDelay: '0s', animationDuration: '2s'}}></div>
          <div className="absolute w-0.5 h-0.5 bg-purple-200/50 rounded-full animate-bounce" 
               style={{top: '60%', right: '20%', animationDelay: '0.5s', animationDuration: '1.5s'}}></div>
          <div className="absolute w-1 h-1 bg-indigo-200/30 rounded-full animate-bounce" 
               style={{bottom: '25%', left: '70%', animationDelay: '1s', animationDuration: '1.8s'}}></div>
        </div>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 ease-in-out"></div>
      </span>
      <div className="absolute inset-0 rounded-full border-2 border-purple-400/20 opacity-0 group-hover:opacity-100 
                    animate-ping group-hover:animate-none transition-opacity duration-300"></div>
    </div>

    <button 
      onClick={() => setSidebarOpen(!sidebarOpen)} 
      className="p-2 rounded-lg hover:bg-purple-600/30 transition-colors duration-200 text-white shadow-md hover:shadow-lg"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {sidebarOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  </div>
</header>

<div className="flex flex-1 pt-16">
  <aside className={`bg-gradient-to-b from-purple-800 to-indigo-900 backdrop-blur-xl border-r border-white/20 flex flex-col justify-between py-8 shadow-xl transition-all duration-500 rounded-br-[15px] h-[calc(100vh-4rem)] overflow-hidden fixed top-16 left-0 ${
    sidebarOpen ? "w-62" : "w-16"
  }`}>

    {/* Profile Section */}
    <div className="p-6 border-b border-white/20">
      <div className="flex flex-col items-center">
        <input type="file" accept="image/*" id="upload-photo" className="hidden" onChange={handleImageUpload} />
        <label htmlFor="upload-photo" className="cursor-pointer relative group">
<div className="relative">
  {sidebarOpen ? (
    // Avatar Mega Ultra Pro
    <div className="relative group/mega-avatar flex items-center justify-center w-23 h-23">
      {/* Aura base con múltiples capas */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-all duration-700 scale-150 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-400 rounded-full blur-lg opacity-25 group-hover:opacity-60 transition-all duration-500 scale-125 group-hover:animate-spin animation-duration-[8s]"></div>

      {/* Sistema de anillos orbitales */}
      <div className="absolute inset-0 rounded-full border border-cyan-300/40 scale-130 opacity-40 group-hover:opacity-80 group-hover:animate-spin transition-all duration-800"></div>

      {/* Marco principal y foto */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-indigo-500/30 group-hover:shadow-3xl group-hover:shadow-purple-600/50 transition-all duration-500 group-hover:scale-115 group-hover:rotate-12">
        <img 
          src={user.foto || "https://via.placeholder.com/80"} 
          alt="Foto de perfil" 
          className="w-full h-full object-cover rounded-full relative z-10
                     group-hover/mega-avatar:scale-110 group-hover/mega-avatar:brightness-110 
                     group-hover/mega-avatar:contrast-125 group-hover/mega-avatar:saturate-125
                     transition-all duration-700 filter group-hover/mega-avatar:drop-shadow-lg"
        />
        {/* Overlay de cristal */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-indigo-500/10 via-transparent to-purple-500/15 
                        opacity-0 group-hover/mega-avatar:opacity-100 transition-opacity duration-500 z-20 rounded-full"></div>
      </div>
    </div>
  ) : (
    // Icono compacto cuando el sidebar está cerrado
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 border-2 border-white shadow-md">
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    </div>
  )}1

  {/* Overlay de carga */}
  {loading && sidebarOpen && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs rounded-full">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  )}
</div>

        </label>
        {sidebarOpen && (
          <div className="text-center mt-3">
            <h3 className="font-semibold text-white text-lg">{user.nombre}</h3>
            <p className="text-white/70 text-sm">CC: {user.numeroDocumento}</p>
            {user.especialidad && (
              <span className="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full mt-1">
                {user.especialidad}
              </span>
            )}
          </div>
        )}
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 py-4">
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <a key={index} href={item.link} 
             className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group">
            <Image src={item.icon} alt={item.label} width={20} height={20} 
                   className="group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" />
            {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
          </a>
        ))}
      </div>
    </nav>

    {/* Logout */}
    <div className="p-4 border-t border-white/20">
      <button onClick={() => { localStorage.removeItem("userData"); router.replace("/usuario-login"); }}
              className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:via-red-800 hover:to-red-700 
                         py-2 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
        <span className="text-sm">{sidebarOpen && "Cerrar Sesión"}</span>
      </button>
    </div>
  </aside>

        {/* Main Content */}
          <main
            className={`flex-1 p-8 space-y-8 transition-all duration-300 ${
              sidebarOpen ? "ml-57" : "ml-20"
            }`}
          >
          {/* Cards Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-bold text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Información Personal
                  </h2>
                  <button 
                    onClick={openEditModal}
                    className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Nombre Completo</p>
                      <p className="font-semibold text-slate-800">{user.nombre}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Documento</p>
                      <p className="font-semibold text-slate-800">{user.numeroDocumento}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Correo Electrónico</p>
                      <p className="font-semibold text-slate-800">{user.correo}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Teléfono</p>
                      <p className="font-semibold text-slate-800">{user.telefono}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Oferta Relámpago */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Oferta Relámpago
                </h2>
              </div>
              <div className="p-0">
                <img 
                  src="/Mark1.png" 
                  alt="Publicidad Mark" 
                  className="w-full h-65 object-fill"
                />
              </div>
            </div>
          </div>

          {/* Categorías */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
              <h2 className="text-white font-bold text-xl flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Categorías de Hoy
              </h2>
              <p className="text-indigo-100 text-sm mt-1">Explora las oportunidades disponibles</p>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Nuevo
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Crea un Currículum</h3>
                    <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                      Las empresas podrán verlo y contactarte directamente para nuevas oportunidades.
                    </p>
                    <div className="flex items-center justify-between">
                      <a href="/usuario-dashboard/curriculum"  className="text-white font-semibold text-sm hover:text-blue-200 transition-colors flex items-center gap-1">
                        Ver más
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Popular
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Busca Ofertas Nuevas</h3>
                    <p className="text-purple-100 text-sm mb-4 leading-relaxed">
                      Hoy podría ser tu día para conocer nuevas ofertas laborales que se ajusten a tu perfil.
                    </p>
<div className="flex items-center justify-between">
  <a 
    href="/usuario-dashboard/" 
    className="text-white font-semibold text-sm hover:text-purple-200 transition-colors flex items-center gap-1"
  >
    Ver más
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </a>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Profesional */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-xl">Editar Información Personal</h3>
                  <p className="text-purple-100 text-sm mt-1">Actualiza tus datos de perfil</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    value={editData.nombre} 
                    onChange={(e) => setEditData(prev => ({ ...prev, nombre: e.target.value }))} 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Número de Documento
                  </label>
                  <input 
                    type="text" 
                    value={editData.numeroDocumento} 
                    onChange={(e) => setEditData(prev => ({ ...prev, numeroDocumento: e.target.value }))} 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Número de documento"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    value={editData.correo} 
                    onChange={(e) => setEditData(prev => ({ ...prev, correo: e.target.value }))} 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Teléfono
                  </label>
                  <input 
                    type="text" 
                    value={editData.telefono} 
                    onChange={(e) => setEditData(prev => ({ ...prev, telefono: e.target.value }))} 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Número de teléfono"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a6 6 0 1112 0v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm10-1a4 4 0 00-8 0v1h8V5z" clipRule="evenodd" />
                    </svg>
                    Especialidad
                  </label>
                  <input
                    type="text"
                    value={editData.especialidad}
                    onChange={(e) => setEditData(prev => ({ ...prev, especialidad: e.target.value }))}
                    placeholder="Ej: Programador Frontend, Diseñador Gráfico, Contador, etc."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-slate-700 font-medium transition-colors duration-200"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveUsuario} 
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}