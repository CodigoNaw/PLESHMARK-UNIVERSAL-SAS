"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CurriculumPage() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
   const [preview, setPreview] = useState(null);
   const [loading, setLoading] = useState(false);
   const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserData();
      if (!data) {
        router.push("/login");
      } else {
        setUser(data);
      }
    };
    fetchUser();
  }, [router]);
  const menuItems = [
    { icon: "/casita.png", label: "INICIO", link: "/usuario-dashboard" },
    { icon: "/postulacion.png", label: "CURRICULUM", link: "/usuario-dashboard/curriculum" },
    { icon: "/pqr.png", label: "PQRS", link: "/usuario-dashboard/pqrs" },
    { icon: "/archivito.png", label: "OFERTAS", link: "/usuario-dashboard/ofertas" },
  ];

  // ====== TU LÓGICA DE SUBIR CURRÍCULUM ======
  const handleCurriculumUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("curriculum", file);
    formData.append("id", user.id || user._id);

    try {
      const res = await fetch("/api/usuario/curriculum", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir curriculum");

      const updatedUsuario = {
        ...user,
        pdfCurriculum: data.pdfCurriculum,
        pdfCurriculumDownload: data.pdfCurriculumDownload,
      };

      setUser(updatedUsuario);
      localStorage.setItem("userData", JSON.stringify(updatedUsuario));
      alert("Currículum actualizado correctamente ✅");
    } catch (err) {
      console.error("Error subiendo curriculum:", err);
      alert("No se pudo subir el curriculum");
    }
  };
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

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-100">
      {/* ====== HEADER ====== */}
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
        {/* ====== SIDEBAR ====== */}
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
            <div className="relative group/mega-avatar flex items-center justify-center w-20 h-20">
              {/* Aura base */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-all duration-700 scale-150 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-400 rounded-full blur-lg opacity-25 group-hover:opacity-60 transition-all duration-500 scale-125 group-hover:animate-spin animation-duration-[8s]"></div>
              {/* Marco y foto */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-indigo-500/30 group-hover:shadow-3xl group-hover:shadow-purple-600/50 transition-all duration-500 group-hover:scale-115 group-hover:rotate-12">
                <img
                  src={preview || user?.foto || "https://via.placeholder.com/80"}
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
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 border-2 border-white shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
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
            <div className="relative group/mega-avatar flex items-center justify-center w-23 h-23">
              {/* Aura base */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-all duration-700 scale-150 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-400 rounded-full blur-lg opacity-25 group-hover:opacity-60 transition-all duration-500 scale-125 group-hover:animate-spin animation-duration-[8s]"></div>
              {/* Marco y foto */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-indigo-500/30 group-hover:shadow-3xl group-hover:shadow-purple-600/50 transition-all duration-500 group-hover:scale-115 group-hover:rotate-12">
                <img
                  src={preview || user?.foto || "https://via.placeholder.com/80"}
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
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 border-2 border-white shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
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


        {/* ====== CONTENIDO PRINCIPAL (TU CÓDIGO) ====== */}
<main className="flex-1 p-6 md:ml-64 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
  <div className="max-w-4xl mx-auto">
    {/* Header con gradiente */}
<div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-xl mb-8">
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold mb-2">Mi Currículum</h1>
      <p className="text-blue-100 opacity-90">Gestiona y visualiza tu perfil profesional</p>
    </div>

    {/* Botón Ayuda */}
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
          Consejos
        </span>
      </span>
    </button>
  </div>
</div>


    {user && (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Información Personal</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nombre</p>
                <p className="text-lg font-semibold text-gray-900">{user.nombre}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-green-500">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Correo</p>
                <p className="text-lg font-semibold text-gray-900">{user.correo}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-purple-500">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Teléfono</p>
                <p className="text-lg font-semibold text-gray-900">{user.telefono}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-orange-500">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Especialidad</p>
                <p className="text-lg font-semibold text-gray-900">{user.especialidad}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Sección de Currículum */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Documento de Currículum</h2>
            <p className="text-gray-600">Sube y gestiona tu CV en formato PDF</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Zona de subida mejorada */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Subir nuevo currículum
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer group">
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleCurriculumUpload} 
              className="hidden" 
              id="curriculum-upload"
            />
            <label htmlFor="curriculum-upload" className="cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">Arrastra tu archivo PDF aquí</p>
              <p className="text-sm text-gray-500">o haz clic para seleccionar un archivo</p>
            </label>
          </div>
        </div>

        {/* Estado del currículum */}
        {user?.pdfCurriculum ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Currículum disponible</h3>
                <p className="text-green-600">Tu documento está listo para ser visualizado</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={user.pdfCurriculum}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                Ver Currículum
              </a>
              
              <a
                href={`/api/usuario/curriculum/download?id=${user.id || user._id}`}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
                Descargar Currículum
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Sin currículum</h3>
            <p className="text-amber-600">Aún no has subido tu currículum. Sube un archivo PDF para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  </div>
{isHelpOpen && (
   <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl relative overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-300 scale-[0.95]">

      
      {/* Header con diseño premium */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6">
        {/* Elementos decorativos */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-8"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-6 translate-x-6"></div>
          <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white/5 rounded-full translate-y-4"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

        {/* Botón cerrar premium */}
        <button
          onClick={() => setIsHelpOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md
                   rounded-full flex items-center justify-center text-white hover:text-red-300
                   transition-all duration-300 hover:scale-110 hover:rotate-90 group border border-white/20"
        >
          <svg className="w-5 h-5 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>

        {/* Título mejorado */}
<div className="relative z-10">
  <div className="flex items-center mb-1">
    <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm">
      <span className="text-lg">🚀</span>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-white leading-snug">
        Consejos para un <span className="text-yellow-300 font-black bg-white/10 px-1.5 py-0.5 rounded-md">Currículum Exitoso</span>
      </h2>
    </div>
  </div>
  <p className="text-purple-100 font-medium ml-12 text-sm">
    Guía profesional para destacar y conseguir entrevistas
  </p>
</div>

      </div>

      {/* Contenido principal */}
      <div className="px-8 py-8 bg-gradient-to-b from-white to-gray-50">
        
        {/* Grid de consejos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Tarjeta 1 - Rediseñada */}
          <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-200 hover:border-blue-300 
                        transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-bl-3xl opacity-50"></div>
            
            <div className="relative p-6">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl 
                              flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-blue-700 transition-colors">
                Información Esencial
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Incluye datos de contacto actualizados, formación académica relevante, experiencia laboral y habilidades técnicas que agreguen valor.
              </p>
              
              <div className="mt-4 flex items-center text-xs text-blue-600 font-medium">
                <span className="mr-1">📋</span>
                Datos completos y verificados
              </div>
            </div>
          </div>

          {/* Tarjeta 2 - Rediseñada */}
          <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-200 hover:border-purple-300 
                        transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-bl-3xl opacity-50"></div>
            
            <div className="relative p-6">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl 
                              flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-purple-700 transition-colors">
                Logros Destacados
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Prioriza achievements cuantificables y responsabilidades que demuestren impacto. Usa verbos de acción y métricas específicas.
              </p>
              
              <div className="mt-4 flex items-center text-xs text-purple-600 font-medium">
                <span className="mr-1">📈</span>
                Resultados medibles
              </div>
            </div>
          </div>

          {/* Tarjeta 3 - Rediseñada */}
          <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 
                        transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-bl-3xl opacity-50"></div>
            
            <div className="relative p-6">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl 
                              flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-emerald-700 transition-colors">
                Adaptación Inteligente
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Personaliza tu CV para cada oportunidad: enfatiza competencias y experiencias alineadas con los requisitos del puesto.
              </p>
              
              <div className="mt-4 flex items-center text-xs text-emerald-600 font-medium">
                <span className="mr-1">🎯</span>
                Enfoque estratégico
              </div>
            </div>
          </div>

        </div>

        {/* Sección de consejos adicionales */}
<div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
  <div className="flex items-center gap-6">
    
    {/* Ícono */}
    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl 
                    flex items-center justify-center shadow-md">
      <span className="text-white text-xl">💡</span>
    </div>

    {/* Título + Subtítulo */}
    <div className="flex flex-col">
      <h3 className="font-bold text-gray-800 text-lg">Consejos Pro</h3>
      <p className="text-gray-600 text-sm">Detalles que marcan la diferencia</p>
    </div>

    {/* Consejos */}
    <div className="flex items-center gap-6 flex-wrap">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        <p className="text-gray-700 text-sm">
          <span className="font-semibold text-gray-800">Palabras clave:</span> Incluye términos técnicos relevantes para pasar filtros ATS
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
        <p className="text-gray-700 text-sm">
          <span className="font-semibold text-gray-800">Revisión final:</span> Elimina errores ortográficos y verifica que toda la información esté actualizada
        </p>
      </div>
    </div>
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
