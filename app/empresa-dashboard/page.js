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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("INICIO");
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
      {/* Header mejorado */}
      <header
        className="flex items-center justify-between h-20 px-8 
                   bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 
                   shadow-lg backdrop-blur-md fixed top-0 left-0 right-0 z-50
                   border-b border-purple-400/30"
      >
        {/* IZQUIERDA: Logo + info empresa */}
<div className="flex items-center gap-3">
  <Image
    src="/logo.png"
    alt="Logo"
    width={45}
    height={45}
    className="rounded-lg shadow-md"
  />
  <h2 className="text-white font-extrabold text-2xl tracking-wide">
    PLESHMARK
  </h2>
</div>


        {/* CENTRO: Menú navegación con estados activos */}
        <nav className="flex items-center gap-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveMenuItem(item.label);
                if (item.label === "PQRS") router.push("/empresa-dashboard/pqrs");
                else if (item.label === "INICIO") router.push("/empresa-dashboard");
                else if (item.label === "CANDIDATOS")
                  router.push("/empresa-dashboard/postulaciones");
                else if (item.label === "OFERTAS")
                  router.push("/empresa-dashboard/ofertas");
              }}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeMenuItem === item.label
                  ? 'bg-white/20 text-white border border-white/30 shadow-lg scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {/* Indicador activo */}
              {activeMenuItem === item.label && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
              
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
                activeMenuItem === item.label
                  ? 'bg-white/30 shadow-md'
                  : 'bg-white/10 group-hover:bg-white/20'
              }`}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className={`font-medium text-sm hidden lg:block transition-all duration-300 ${
                activeMenuItem === item.label
                  ? 'font-bold'
                  : ''
              }`}>
                {item.label}
              </span>

              {/* Efecto de brillo en activo */}
              {activeMenuItem === item.label && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-50"></div>
              )}
            </button>
          ))}
        </nav>

        {/* DERECHA: Rol + dropdown usuario */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-30 group-hover:opacity-70 blur-sm animate-pulse"></div>
            <span className="relative flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-full 
                            bg-gradient-to-r from-purple-500/80 via-purple-600/80 to-indigo-600/80 
                            backdrop-blur-xl border border-white/30 shadow-2xl
                            hover:shadow-purple-500/25 hover:scale-105 hover:border-white/50
                            transition-all duration-300 ease-out">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-ping"></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 absolute"></div>
              <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                Rol: {user.rol}
              </span>
            </span>
          </div>

          {/* Dropdown Usuario */}
          <div className="relative">
<button
  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md 
             px-4 py-2 rounded-xl border border-white/20 transition-all duration-300 
             hover:scale-105 group"
>
  {/* Foto o inicial */}
  {user?.foto ? (
    <img
      src={user.foto}
      alt="Foto de perfil"
      className="w-8 h-8 rounded-full object-cover shadow-lg border border-white/30"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 
                    flex items-center justify-center text-white font-bold text-sm shadow-lg">
      {user?.nombreEmpresa?.charAt(0) || "E"}
    </div>
  )}

  <div className="hidden md:block text-left">
    <p className="text-white font-medium text-sm truncate max-w-[120px]">
      {user?.nombreEmpresa}
    </p>
    <p className="text-white/70 text-xs">Empresa</p>
  </div>

  <svg
    className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
      userDropdownOpen ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</button>


            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl 
                              rounded-2xl shadow-2xl border border-white/30 py-2 z-50
                              animate-in slide-in-from-top-2 duration-300">
                
                {/* Perfil header */}
<div className="px-4 py-3 border-b border-gray-200/50">
  <div className="flex items-center gap-3">
    {/* Foto del usuario o inicial */}
    {user?.foto ? (
      <img
        src={user.foto}
        alt="Foto de perfil"
        className="w-10 h-10 rounded-full object-cover shadow-lg border border-gray-200"
      />
    ) : (
      <div
        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 
                   flex items-center justify-center text-white font-bold shadow-lg"
      >
        {user?.nombreEmpresa?.charAt(0) || "E"}
      </div>
    )}

    <div>
      <p className="font-semibold text-gray-800 truncate max-w-[150px]">
        {user?.nombreEmpresa}
      </p>
      <p className="text-gray-500 text-sm">NIT: {user?.nit}</p>
    </div>
  </div>
</div>


                {/* Menu items */}
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors duration-200 flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-700">Mi Perfil</span>
                  </button>
                  
                  <button className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors duration-200 flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">Configuración</span>
                  </button>

                  <div className="border-t border-gray-200/50 my-2"></div>

                  <button
                    onClick={() => {
                      localStorage.removeItem("userData");
                      router.replace("/empresa-login");
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors duration-200 
                               flex items-center gap-3 text-red-600 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Click outside para cerrar dropdown */}
      {userDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserDropdownOpen(false)}
        ></div>
      )}

      {/* Contenido principal */}
     <main className="pt-24 min-h-screen">
  <div
    className="w-full max-w-7xl rounded-lg p-8 lg:p-12 border border-gray-200 bg-white shadow-sm relative mx-auto"
  >
    {/* Botón Editar */}
    <button
      onClick={openEditModal}
      className="absolute top-6 right-6 z-20
               bg-blue-600 hover:bg-blue-700
               text-white px-5 py-2.5 rounded-md 
               shadow-sm hover:shadow-md
               transition-colors duration-200
               flex items-center gap-2 text-sm font-medium
               border border-blue-600 hover:border-blue-700"
    >
      ✏️ Editar
    </button>

    <div className="relative z-10">
      {/* Cabecera */}
      <div className="flex items-start gap-8 mb-10 pb-8 border-b border-gray-200">
        {/* Foto */}
        <div className="w-28 h-28 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden relative shadow-sm border border-gray-200 cursor-pointer">
          {fotoPreview ? (
            <img
              src={fotoPreview}
              alt="Foto empresa"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-500 text-sm">Sin foto</span>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
        </div>

        {/* Información principal */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
            {user.nombreEmpresa || "Nombre de la Empresa"}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 mb-1">
            <span className="text-lg font-medium">NIT: {user.nit}</span>
          </div>
          {user.tipoEmpresa && (
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">
              {user.tipoEmpresa}
            </div>
          )}
        </div>
      </div>

      {/* Información de contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Teléfono */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Teléfono</h3>
          </div>
          <p className="text-gray-700 font-medium">{user.telefono || "No registrado"}</p>
        </div>

        {/* Dirección */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Dirección</h3>
          </div>
          <p className="text-gray-700 font-medium">{user.direccion || "No registrada"}</p>
        </div>

        {/* Email o campo adicional */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Categoría</h3>
          </div>
          <p className="text-gray-700 font-medium">{user.tipoEmpresa || "No registrado"}</p>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-10 bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Descripción de la Empresa</h2>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {user.descripcion || "Esta empresa aún no ha agregado una descripción corporativa."}
        </p>
      </div>

      {/* Secciones PERFIL y CURRICULUM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Perfil Empresarial</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Gestiona la información completa de tu empresa, incluyendo datos corporativos, certificaciones y más.
            </p>
            <a 
              href="/perfil" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Ver Perfil Completo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                    <path fillRule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 3a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 3a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Currículum Corporativo</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Administra la experiencia, proyectos realizados y capacidades técnicas de tu empresa.
            </p>
            <a 
              href="empresa-dashboard/postulaciones" 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Ver Currículum
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

      {/* Modal (sin cambios) */}
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
    </div>
  );
}