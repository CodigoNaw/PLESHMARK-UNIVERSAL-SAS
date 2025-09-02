"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EmpresaDashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    nombreEmpresa: "",
    telefono: "",
    tipoEmpresa: "",
    direccion: "",
    descripcion: ""
  });
  
  const router = useRouter();

  const menuItems = [
    { icon: "/casita.png", label: "INICIO" },
    { icon: "/postulacion.png", label: "CANDIDATOS" },
    { icon: "/pqr.png", label: "PQRS" },
    { icon: "/archivito.png", label: "OFERTAS" },
  ];

  // 🔹 Cargar datos iniciales
  useEffect(() => {
    const tokenData = getUserData();
    console.log("Datos cargados en dashboard:", tokenData);

    if (!tokenData) {
      router.push("/empresa-login");
      return;
    }
    if (tokenData.rol !== "empresa") {
      if (tokenData.rol === "admin") router.push("/admin-dashboard");
      if (tokenData.rol === "usuario") router.push("/usuario-dashboard");
      return;
    }

    setUser(tokenData);
    setFotoPreview(tokenData.foto || null);

    fetch(`/api/empresa/${tokenData.id || tokenData._id}`)
      .then(res => res.json())
      .then(info => {
        const mergedUser = {
          ...tokenData,
          ...info,
          id: tokenData.id || tokenData._id || info.id || info._id
        };
        setUser(mergedUser);
        setEditData({
          nombreEmpresa: mergedUser.nombreEmpresa || "",
          telefono: mergedUser.telefono || "",
          tipoEmpresa: mergedUser.tipoEmpresa || "",
          direccion: mergedUser.direccion || "",
          descripcion: mergedUser.descripcion || ""
        });
        setFotoPreview(mergedUser.foto || null);
        localStorage.setItem("userData", JSON.stringify(mergedUser));
      })
      .catch(err => console.error("Error cargando empresa:", err));
  }, [router]);

  // 🔹 Subir foto
  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFotoPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("id", user.id || user._id);

    try {
      const res = await fetch("/api/empresa/foto", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir foto");

      const updatedUser = {
        ...user,
        foto: data.foto,
        id: user.id || user._id
      };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      alert("Foto actualizada correctamente");
    } catch (err) {
      console.error("Error subiendo foto:", err);
      alert("Error al subir foto");
    }
  };

  // 🔹 Guardar cambios en modal
  const handleSave = async () => {
    const userData = getUserData();
    console.log("UserData en handleSave:", userData);

    if (!userData?.id && !userData?._id) {
      alert("ID de empresa requerido");
      return;
    }

    try {
      const res = await fetch("/api/empresa/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: userData.id || userData._id,
          ...editData
        })
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Error al actualizar");
      }

      const updatedUser = {
        ...user,
        ...editData,
        id: user.id || user._id
      };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      setIsModalOpen(false);
      alert("Cambios guardados correctamente");
    } catch (err) {
      console.error("Error guardando:", err);
      alert(err.message || "No se pudo actualizar");
    }
  };

  // 🔹 Abrir modal
  const openEditModal = () => {
    setEditData({
      nombreEmpresa: user.nombreEmpresa || "",
      telefono: user.telefono || "",
      tipoEmpresa: user.tipoEmpresa || "",
      direccion: user.direccion || "",
      descripcion: user?.descripcion || ""
    });
    setIsModalOpen(true);
  };

  if (!user) return null;

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('')",
        backgroundAttachment: "fixed"
      }}
    >

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






<main
  className={`flex-1 p-4 lg:p-8 transition-all duration-300 ${
    sidebarOpen ? "ml-64" : "ml-20"
  } bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 min-h-screen`}
>

  <div
    className="w-full max-w-7xl rounded-3xl p-6 lg:p-10 border border-white/60 bg-white/98 backdrop-blur-3xl relative mx-auto overflow-hidden"
    style={{
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 8px 16px -8px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.95)",
    }}
  >
    {/* Efectos de fondo mejorados */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white/20 to-indigo-50/40 pointer-events-none"></div>
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
    
    {/* Botón Editar - SIN CAMBIOS */}
    <button
      onClick={openEditModal}
      className="group absolute top-5 right-5 z-20
               bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 
               hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500
               text-white px-6 py-3 rounded-2xl 
               shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25
               transition-all duration-300 ease-out
               flex items-center gap-3 text-sm font-semibold
               border border-cyan-400/30 hover:border-cyan-300/50
               backdrop-blur-xl bg-opacity-90
               hover:scale-105 active:scale-95
               relative overflow-hidden
               before:absolute before:inset-0 
               before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 
               before:-translate-x-full hover:before:translate-x-full 
               before:transition-transform before:duration-700
               after:absolute after:top-0 after:left-0 after:right-0 after:h-px 
               after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent
               hover:after:via-white/60"
    >
      ✏️ Editar
    </button>

    <div className="relative z-10">
      {/* Cabecera refinada */}
      <div className="flex items-center gap-10 mb-12 pb-8 border-b border-gradient-to-r from-transparent via-gray-200/80 to-transparent relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"></div>
        
        {/* Foto - SIN CAMBIOS */}
<div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative shadow-xl shadow-gray-900/10 border-4 border-white/80 group hover:scale-105 transition-all duration-300 cursor-pointer">
  {/* Imagen o placeholder */}
  {fotoPreview ? (
    <img
      src={fotoPreview}
      alt="Foto empresa"
      className="w-full h-full object-cover rounded-3xl"
    />
  ) : (
    <span className="text-gray-400 text-sm font-medium">Sin foto</span>
  )}

  {/* Input invisible para seleccionar imagen */}
  <input
    type="file"
    accept="image/*"
    onChange={handleFotoChange}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
  />

  {/* Overlay decorativo hover */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none z-10"></div>
</div>


        {/* Título refinado */}
        <div className="flex-1">
          <h2 className="text-5xl font-black bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight mb-4">
            {user.nombreEmpresa || "Nombre de la Empresa"}
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
          </div>
        </div>
      </div>

      {/* Info general refinada */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Tarjeta NIT refinada */}
          <div className="group bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 rounded-3xl p-7 border border-blue-100/60 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">NIT Empresarial</span>
                <p className="text-2xl font-black text-slate-900">{user.nit}</p>
              </div>
            </div>
          </div>

          {/* Teléfono refinado */}
          <div className="group bg-gradient-to-br from-white via-emerald-50/50 to-green-50/30 rounded-3xl p-7 border border-emerald-100/60 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 block">Contacto</span>
                <p className="text-2xl font-black text-slate-900">{user.telefono || "No registrado"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Tipo empresa refinado */}
          <div className="group bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30 rounded-3xl p-7 border border-purple-100/60 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1 block">Categoría</span>
                <p className="text-2xl font-black text-slate-900">{user.tipoEmpresa || "No registrado"}</p>
              </div>
            </div>
          </div>

          {/* Dirección refinada */}
          <div className="group bg-gradient-to-br from-white via-orange-50/50 to-amber-50/30 rounded-3xl p-7 border border-orange-100/60 shadow-lg hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1 block">Ubicación</span>
                <p className="text-2xl font-black text-slate-900">{user.direccion || "No registrada"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción refinada */}
      <div className="mb-14 bg-gradient-to-br from-slate-50/90 via-white/60 to-blue-50/50 rounded-3xl p-10 border border-slate-200/60 shadow-xl shadow-slate-900/5 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-slate-300/20 to-blue-300/20 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-3xl font-black text-slate-800">Descripción Corporativa</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-300 via-blue-300 to-transparent"></div>
        </div>
        <p className="text-slate-700 leading-relaxed text-xl pl-18 relative z-10 font-medium">
          {user.descripcion || "Esta empresa aún no ha agregado una descripción corporativa."}
        </p>
      </div>

      {/* Secciones PERFIL y CURRICULUM refinadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 text-white rounded-3xl shadow-2xl hover:shadow-3xl hover:shadow-cyan-500/20 transition-all duration-700 hover:-translate-y-2 hover:rotate-1">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative p-10 h-40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black tracking-wide">PERFIL</h3>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <a 
              href="/perfil" 
              className="flex items-center justify-between text-cyan-100 hover:text-white transition-all duration-500 group-hover:translate-x-4"
            >
              <span className="font-bold text-base uppercase tracking-widest">Explorar más</span>
              <svg className="w-6 h-6 transform group-hover:translate-x-4 group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700 text-white rounded-3xl shadow-2xl hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-700 hover:-translate-y-2 hover:-rotate-1">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative p-10 h-40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black tracking-wide">CURRICULUM</h3>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                  <path fillRule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 3a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 3a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <a 
              href="/curriculum" 
              className="flex items-center justify-between text-purple-100 hover:text-white transition-all duration-500 group-hover:translate-x-4"
            >
              <span className="font-bold text-base uppercase tracking-widest">Explorar más</span>
              <svg className="w-6 h-6 transform group-hover:translate-x-4 group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>




      </div>

      {/* ------------------ Modal (insertado, sin tocar tu layout) ------------------ */}
{isModalOpen && (
  <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-indigo-900/50 backdrop-blur-xl flex items-center justify-center z-50 p-4">
    <div className="bg-white/98 backdrop-blur-2xl rounded-3xl p-8 w-[750px] max-w-[95%] shadow-2xl border border-white/30 relative overflow-hidden animate-slideUp">

      {/* Efectos decorativos de fondo */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-2xl"></div>
      <div className="absolute top-4 right-8 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 left-12 w-1 h-1 bg-blue-400/60 rounded-full animate-ping"></div>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 bg-clip-text text-transparent">
              Editar Información
            </h3>
            <p className="text-slate-600 text-sm font-medium">Actualiza los datos de tu empresa</p>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-purple-300/60 to-transparent"></div>
      </div>

      {/* Formulario */}
      <div className="relative z-10 grid grid-cols-2 gap-6 mb-8">
        {/* Nombre de empresa */}
        <div className="group">
          <label className="text-sm font-bold text-slate-700 mb-3 block flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            Nombre de la empresa
          </label>
          <input
            type="text"
            value={editData.nombreEmpresa}
            onChange={(e) => setEditData(prev => ({ ...prev, nombreEmpresa: e.target.value }))}
            placeholder="Ingresa el nombre de la empresa"
            className="w-full p-4 border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Teléfono */}
        <div className="group">
          <label className="text-sm font-bold text-slate-700 mb-3 block flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
            Teléfono
          </label>
          <input
            type="text"
            value={editData.telefono}
            onChange={(e) => setEditData(prev => ({ ...prev, telefono: e.target.value }))}
            placeholder="Número de contacto"
            className="w-full p-4 border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300"
          />
        </div>

        {/* Tipo de empresa */}
        <div className="group">
          <label className="text-sm font-bold text-slate-700 mb-3 block flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
            Tipo de empresa
          </label>
          <input
            type="text"
            value={editData.tipoEmpresa}
            onChange={(e) => setEditData(prev => ({ ...prev, tipoEmpresa: e.target.value }))}
            placeholder="Sector o categoría empresarial"
            className="w-full p-4 border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300"
          />
        </div>

        {/* Dirección */}
        <div className="group">
          <label className="text-sm font-bold text-slate-700 mb-3 block flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
            Dirección
          </label>
          <input
            type="text"
            value={editData.direccion}
            onChange={(e) => setEditData(prev => ({ ...prev, direccion: e.target.value }))}
            placeholder="Ubicación física de la empresa"
            className="w-full p-4 border-2 border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 transition-all duration-300"
          />
        </div>

        {/* Descripción */}
        <div className="col-span-2 group">
          <label className="text-sm font-bold text-slate-700 mb-3 block flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
            Descripción corporativa
          </label>
          <textarea
            value={editData.descripcion}
            onChange={(e) => setEditData(prev => ({ ...prev, descripcion: e.target.value }))}
            placeholder="Describe brevemente tu empresa, sus servicios y valores..."
            className="w-full p-4 border-2 border-slate-200 rounded-2xl h-24 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="relative z-10 flex justify-end gap-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-300/50 shadow-lg transition-all duration-300"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold border border-purple-500/30 shadow-xl transition-all duration-300"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  </div>
)}




      {/* ------------------------------------------------------------------------- */}

    </div>
  );
}
