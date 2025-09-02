"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OfertasPage() {
  const [ofertas, setOfertas] = useState([]);
  const [form, setForm] = useState({
    cargo: "",
    salario: "",
    direccion: "",
    descripcion: "",
    estado: "activo",
    telefono: "",
    tipoContrato: "indefinido",
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [busquedaId, setBusquedaId] = useState("");
  const [ofertaEncontrada, setOfertaEncontrada] = useState(null);
  const [errorBusqueda, setErrorBusqueda] = useState("");

  const router = useRouter();

  const menuItems = [
    { icon: "/casita.png", label: "INICIO" },
    { icon: "/postulacion.png", label: "CANDIDATOS" },
    { icon: "/pqr.png", label: "PQRS" },
    { icon: "/archivito.png", label: "OFERTAS" },
  ];

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      router.push("/empresa-login");
      return;
    }
    setEmpresa(userData._id);
    setUser(userData);
    setFotoPreview(userData.foto || null);
    fetchOfertas(userData._id);
  }, [router]);

  // Cargar ofertas de la empresa
  async function fetchOfertas(idEmpresa) {
    try {
      const res = await fetch(`/api/ofertas?empresaId=${idEmpresa}`);
      const data = await res.json();
      if (Array.isArray(data.ofertas)) setOfertas(data.ofertas);
      else setOfertas([]);
    } catch (err) {
      console.error("Error al cargar ofertas:", err);
    }
  }

  // Crear o actualizar oferta
  async function handleSubmit(e) {
    e.preventDefault();
    if (!empresa) return alert("No se encontró la empresa logueada");

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/ofertas/${editId}` : "/api/ofertas";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, empresaId: empresa }),
    });

    setForm({
      cargo: "",
      salario: "",
      direccion: "",
      descripcion: "",
      estado: "activo",
      telefono: "",
      tipoContrato: "indefinido",
    });
    setEditId(null);
    setShowModal(false);
    fetchOfertas(empresa);
  }

  // Eliminar oferta
  async function handleDelete() {
    await fetch(`/api/ofertas/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    setShowDeleteModal(false);
    fetchOfertas(empresa);
  }

  // Abrir modal crear
  function openCreateModal() {
    setForm({
      cargo: "",
      salario: "",
      direccion: "",
      descripcion: "",
      estado: "activo",
      telefono: "",
      tipoContrato: "indefinido",
    });
    setEditId(null);
    setShowModal(true);
  }

  // Abrir modal editar
  function openEditModal(oferta) {
    setForm({
      cargo: oferta.cargo,
      salario: oferta.salario,
      direccion: oferta.direccion,
      descripcion: oferta.descripcion,
      estado: oferta.estado || "activo",
      telefono: oferta.telefono || "",
      tipoContrato: oferta.tipoContrato || "indefinido",
    });
    setEditId(oferta._id);
    setShowModal(true);
  }

  function openDeleteModal(id) {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  // Buscar oferta por ID con delay
  useEffect(() => {
    if (!busquedaId) {
      setOfertaEncontrada(null);
      setErrorBusqueda("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/ofertas/${busquedaId}`);
        const data = await res.json();
        if (!res.ok) setErrorBusqueda(data.error || "Oferta no encontrada");
        else {
          setOfertaEncontrada(data);
          setErrorBusqueda("");
        }
      } catch {
        setErrorBusqueda("Error de conexión con el servidor");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [busquedaId]);

  if (!user) return null;

  return (
    
    <div className="min-h-screen flex">
      {/* HEADER */}
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
        </div>
      </header>

      {/* ASIDE */}
      <aside className="w-64 bg-gradient-to-b from-purple-800 to-indigo-900 backdrop-blur-xl border-r border-white/20 flex flex-col justify-between py-6 shadow-xl fixed left-0 top-16 bottom-0">
        {sidebarOpen && (
          <div className="text-center px-4 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
              <h2 className="text-white text-2xl font-semibold drop-shadow-lg text-center break-words leading-tight max-w-[150px] mx-auto">
                {user.nombreEmpresa}
              </h2>
              <p className="text-white/70 text-sm mt-1 truncate">NIT: {user.nit}</p>
            </div>
          </div>
        )}

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
              <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300 shadow-sm">
                <Image src={item.icon} alt={item.label} width={24} height={24} />
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
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
<main className="flex-1 ml-64 mt-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
        {/* Contenedor principal con padding moderno */}
        <div className="p-8">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-indigo-700/90"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full translate-y-36 -translate-x-36 blur-3xl"></div>
              
              <div className="relative z-10">
                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
                  Gestión de <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Ofertas</span>
                </h1>
                <p className="text-white/90 text-lg mb-8 max-w-2xl">
                  Administra y controla todas las oportunidades laborales de tu empresa desde un solo lugar
                </p>
                
                <button
                  onClick={openCreateModal}
                  className="group relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nueva Oferta
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Grid de ofertas */}
<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {ofertas.map((o) => (
              <div
                key={o._id}
                className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradiente de fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Badge de estado */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    o.estado === "activo" 
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg" 
                      : "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg"
                  }`}>
                    {o.estado || "activo"}
                  </span>
                </div>

                <div className="relative z-10 p-6">
                  {/* Header de la tarjeta */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-300">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{o.cargo}</h2>
                      <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                        <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-xs font-mono text-gray-600 truncate">
                          {o._id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Información principal en grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 rounded-2xl border border-emerald-200/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Salario</span>
                      </div>
                      <div className="text-xl font-black text-emerald-900">${o.salario}</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 rounded-2xl border border-blue-200/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Ubicación</span>
                      </div>
                      <div className="text-sm font-bold text-blue-900 truncate">{o.direccion}</div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-4 rounded-2xl border border-pink-200/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                        <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">Teléfono</span>
                      </div>
                      <div className="text-sm font-bold text-pink-900 truncate">{o.telefono || "No especificado"}</div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 rounded-2xl border border-orange-200/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Contrato</span>
                      </div>
                      <div className="text-sm font-bold text-orange-900 truncate">{o.tipoContrato || "indefinido"}</div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border border-slate-200/50 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-slate-700 via-gray-700 to-slate-800 p-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Descripción del cargo</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{o.descripcion}</p>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => openEditModal(o)}
                      className="flex-1 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 text-white px-4 py-3 rounded-2xl font-bold shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </div>
                    </button>
                    
                    <button
                      onClick={() => openDeleteModal(o._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white px-4 py-3 rounded-2xl font-bold shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sección de búsqueda */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Buscar Oferta</h3>
                    <p className="text-white/80 text-sm">Encuentra una oferta específica por su ID único</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ingresa el ID de la oferta..." 
                    value={busquedaId} 
                    onChange={(e) => setBusquedaId(e.target.value)} 
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {errorBusqueda && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      <p className="text-red-700 font-medium">{errorBusqueda}</p>
                    </div>
                  </div>
                )}
                
                {ofertaEncontrada && (
                  <div className="mt-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-blue-200/50 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-4">
                      <h3 className="text-xl font-black text-white">{ofertaEncontrada.cargo}</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white/60 p-3 rounded-xl">
                          <span className="text-xs font-bold text-gray-600 uppercase block mb-1">Salario</span>
                          <span className="text-lg font-black text-gray-900">${ofertaEncontrada.salario}</span>
                        </div>
                        <div className="bg-white/60 p-3 rounded-xl">
                          <span className="text-xs font-bold text-gray-600 uppercase block mb-1">Ubicación</span>
                          <span className="text-sm font-bold text-gray-900">{ofertaEncontrada.direccion}</span>
                        </div>
                        <div className="bg-white/60 p-3 rounded-xl">
                          <span className="text-xs font-bold text-gray-600 uppercase block mb-1">Teléfono</span>
                          <span className="text-sm font-bold text-gray-900">{ofertaEncontrada.telefono || "No especificado"}</span>
                        </div>
                        <div className="bg-white/60 p-3 rounded-xl">
                          <span className="text-xs font-bold text-gray-600 uppercase block mb-1">Tipo de contrato</span>
                          <span className="text-sm font-bold text-gray-900">{ofertaEncontrada.tipoContrato || "indefinido"}</span>
                        </div>
                      </div>
                      <div className="bg-white/60 p-4 rounded-xl">
                        <span className="text-xs font-bold text-gray-600 uppercase block mb-2">Descripción</span>
                        <p className="text-gray-800 text-sm leading-relaxed">{ofertaEncontrada.descripcion}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal de creación/edición */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 p-6">
                <h2 className="text-3xl font-black text-white">
                  {editId ? "✏️ Editar Oferta" : "✨ Nueva Oferta"}
                </h2>
                <p className="text-white/80 mt-2">
                  {editId ? "Modifica los detalles de la oferta laboral" : "Completa la información para crear una nueva oportunidad"}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cargo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Cargo o Posición
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej: Desarrollador Frontend, Contador Senior..." 
                      value={form.cargo} 
                      onChange={(e) => setForm({ ...form, cargo: e.target.value })} 
                      required 
                      className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* Salario */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Salario
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                      <input 
                        type="number" 
                        placeholder="2500000" 
                        value={form.salario} 
                        onChange={(e) => setForm({ ...form, salario: e.target.value })} 
                        required 
                        className="w-full pl-8 pr-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Teléfono de contacto
                    </label>
                    <input 
                      type="text" 
                      placeholder="300 123 4567" 
                      value={form.telefono} 
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })} 
                      className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* Dirección */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Ubicación
                    </label>
                    <input 
                      type="text" 
                      placeholder="Bogotá, Medellín, Cali..." 
                      value={form.direccion} 
                      onChange={(e) => setForm({ ...form, direccion: e.target.value })} 
                      className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Estado de la oferta
                    </label>
                    <select 
                      value={form.estado} 
                      onChange={(e) => setForm({ ...form, estado: e.target.value })} 
                      className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                    >
                      <option value="activo">🟢 Activo</option>
                      <option value="inactivo">🔴 Inactivo</option>
                    </select>
                  </div>

                  {/* Tipo de contrato */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Tipo de contrato
                    </label>
                    <select 
                      value={form.tipoContrato} 
                      onChange={(e) => setForm({ ...form, tipoContrato: e.target.value })} 
                      className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50 focus:bg-white"
                    >
                      <option value="obra labor">🔨 Obra Labor</option>
                      <option value="prestacion de servicio">📋 Prestación de Servicio</option>
                      <option value="indefinido">♾️ Indefinido</option>
                      <option value="temporal">⏱️ Temporal</option>
                    </select>
                  </div>

                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Descripción del cargo
                    </label>
                    <textarea 
                      placeholder="Describe las responsabilidades, requisitos y beneficios del cargo..." 
                      value={form.descripcion} 
                      onChange={(e) => setForm({ ...form, descripcion: e.target.value })} 
                      rows={5}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Botones del modal */}
                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    className="flex-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {editId ? "💾 Actualizar" : "🚀 Crear Oferta"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de eliminación */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">⚠️ Confirmar Eliminación</h3>
                    <p className="text-white/80 mt-1">Esta acción no se puede deshacer</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 text-lg mb-8 text-center">
                  ¿Estás seguro de que deseas eliminar esta oferta de trabajo? Todos los datos se perderán permanentemente.
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowDeleteModal(false)} 
                    className="flex-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className="flex-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}