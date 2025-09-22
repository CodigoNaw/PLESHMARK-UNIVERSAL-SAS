// app/empresa-dashboard/ofertas/page.js
"use client";
import { useState, useEffect, useMemo } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EmpresaOfertasPage() {
  const [form, setForm] = useState({
    cargo: "",
    salario: "",
    direccion: "",
    descripcion: "",
    telefono: "",
    tipoContrato: "indefinido",
    estado: "activo"
  });
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [user, setUser] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("OFERTAS");
  
  // Estados para filtros de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [filterContrato, setFilterContrato] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [sortBy, setSortBy] = useState("recientes");
  const [showFilters, setShowFilters] = useState(false);
  
  const router = useRouter();

  const menuItems = [
    { icon: "/casita.png", label: "INICIO", path: "/empresa-dashboard" },
    { icon: "/postulacion.png", label: "CANDIDATOS", path: "/empresa-dashboard/postulaciones" },
    { icon: "/pqr.png", label: "PQRS", path: "/empresa-dashboard/pqrs" },
    { icon: "/archivito.png", label: "OFERTAS", path: "/empresa-dashboard/ofertas" },
  ];

  // Validar rol y obtener datos del usuario
  useEffect(() => {
    const data = getUserData();
    if (!data) return router.push("/");
    if (!["usuario","empresa"].includes(data.rol)) return router.push("/");
    setUser(data);
  }, [router]);

  useEffect(() => {
    fetchOffers();
  }, []);

  async function getEmpresaId() {
    const u = await getUserData();
    return u?.empresa?._id || u?.empresaId || u?.id || u?._id;
  }

  async function fetchOffers() {
    setLoading(true);
    try {
      const res = await fetch("/api/empresa/ofertas");
      
      let data;
      
      try {
        data = await res.json();
      } catch {
        console.error("Error parseando JSON del backend");
        data = [];
      }

      const empresaId = await getEmpresaId();

      // Asegurarse de que data sea array
      let mis = [];
      if (Array.isArray(data)) {
        mis = data.filter(o => String(o.empresa?._id || o.empresa) === String(empresaId));
      } else {
        console.error("Backend no devolvió un array:", data);
      }

      setOfertas(mis);
    } catch (err) {
      console.error("Error fetchOffers:", err);
      setOfertas([]);
    } finally {
      setLoading(false);
    }
  }

  // Función para filtrar y ordenar ofertas
  const filteredOfertas = useMemo(() => {
    let filtered = [...ofertas];

    // Filtro por término de búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(oferta => 
        oferta.cargo?.toLowerCase().includes(term) ||
        oferta.descripcion?.toLowerCase().includes(term) ||
        oferta.direccion?.toLowerCase().includes(term)
      );
    }

    // Filtro por tipo de contrato
    if (filterContrato !== "todos") {
      filtered = filtered.filter(oferta => oferta.tipoContrato === filterContrato);
    }

    // Filtro por estado
    if (filterEstado !== "todos") {
      filtered = filtered.filter(oferta => oferta.estado === filterEstado);
    }

    // Ordenamiento
    switch (sortBy) {
      case "recientes":
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "antiguos":
        filtered.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case "cargo":
        filtered.sort((a, b) => (a.cargo || "").localeCompare(b.cargo || ""));
        break;
      case "salario-alto":
        filtered.sort((a, b) => (b.salario || 0) - (a.salario || 0));
        break;
      case "salario-bajo":
        filtered.sort((a, b) => (a.salario || 0) - (b.salario || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [ofertas, searchTerm, filterContrato, filterEstado, sortBy]);

  // Función para limpiar todos los filtros
  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterContrato("todos");
    setFilterEstado("todos");
    setSortBy("recientes");
  };

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    const empresaId = await getEmpresaId();
    if (!empresaId) return alert("No se encontró empresa.");

    const body = { ...form, empresa: empresaId, salario: Number(form.salario) };

    try {
      if (editId) {
        const res = await fetch(`/api/empresa/ofertas/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        if (!res.ok) return alert("Error actualizando");
      } else {
        const res = await fetch("/api/empresa/ofertas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        if (!res.ok) return alert("Error creando");
      }

      setForm({ cargo: "", salario: "", direccion: "", descripcion: "", telefono: "", tipoContrato: "indefinido", estado: "activo" });
      setEditId(null);
      setShowModal(false);
      fetchOffers();
    } catch {
      alert("Error de red");
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/empresa/ofertas/${id}`, { method: "DELETE" });
      if (!res.ok) return alert("Error eliminando");
      fetchOffers();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch {
      alert("Error de red");
    }
  }

  function startEdit(o) {
    setForm({
      cargo: o.cargo || "",
      salario: o.salario || "",
      direccion: o.direccion || "",
      descripcion: o.descripcion || "",
      telefono: o.telefono || "",
      tipoContrato: o.tipoContrato || "indefinido",
      estado: o.estado || "activo"
    });
    setEditId(o._id);
    setShowModal(true);
  }

  function openCreateModal() {
    setForm({ cargo: "", salario: "", direccion: "", descripcion: "", telefono: "", tipoContrato: "indefinido", estado: "activo" });
    setEditId(null);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditId(null);
    setForm({ cargo: "", salario: "", direccion: "", descripcion: "", telefono: "", tipoContrato: "indefinido", estado: "activo" });
  }

  function openDeleteModal(id) {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  const getContractTypeColor = (tipo) => {
    const colors = {
      'indefinido': 'bg-green-100 text-green-800',
      'obra labor': 'bg-blue-100 text-blue-800',
      'prestacion de servicio': 'bg-purple-100 text-purple-800',
      'temporal': 'bg-orange-100 text-orange-800'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (estado) => {
    return estado === 'activo' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (!user) return null;

  return (
    <div className="h-screen flex flex-col bg-cover bg-center">
      {/* Header superior */}
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

      {/* MAIN CONTENT */}
      <main className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-lg border-b border-gray-100 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-8">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Gestión de Ofertas
                  </h1>
                  <p className="mt-2 text-base text-gray-600 font-medium">
                    Administra las vacantes de tu empresa de manera profesional 
                    <span className="text-blue-600 font-semibold">({filteredOfertas.length} de {ofertas.length} ofertas)</span>
                  </p>
                </div>
              </div>
              <button
                onClick={openCreateModal}
                className="group inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transform hover:scale-105 transition-all duration-200"
              >
                <svg className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Nueva Oferta
              </button>
            </div>

            {/* SISTEMA DE FILTROS Y BÚSQUEDA */}
            <div className="pb-6 space-y-4">
              {/* Barra de búsqueda principal */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200"
                    placeholder="Buscar por cargo, descripción o ubicación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Toggle filtros avanzados */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center px-6 py-3 border-2 rounded-xl text-base font-semibold transition-all duration-200 ${
                    showFilters 
                      ? 'border-blue-500 text-blue-700 bg-blue-50 shadow-lg'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Filtros Avanzados
                  <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Panel de filtros avanzados */}
              {showFilters && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Filtro por tipo de contrato */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Contrato</label>
                      <select
                        value={filterContrato}
                        onChange={(e) => setFilterContrato(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-base"
                      >
                        <option value="todos">Todos los contratos</option>
                        <option value="indefinido">Indefinido</option>
                        <option value="obra labor">Obra labor</option>
                        <option value="prestacion de servicio">Prestación de servicio</option>
                        <option value="temporal">Temporal</option>
                      </select>
                    </div>

                    {/* Filtro por estado */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Estado</label>
                      <select
                        value={filterEstado}
                        onChange={(e) => setFilterEstado(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-base"
                      >
                        <option value="todos">Todos los estados</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Pausado</option>
                      </select>
                    </div>

                    {/* Ordenamiento */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Ordenar por</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-base"
                      >
                        <option value="recientes">Más recientes</option>
                        <option value="antiguos">Más antiguos</option>
                        <option value="cargo">Cargo (A-Z)</option>
                        <option value="salario-alto">Salario (mayor a menor)</option>
                        <option value="salario-bajo">Salario (menor a mayor)</option>
                      </select>
                    </div>

                    {/* Botón limpiar filtros */}
                    <div className="flex items-end">
                      <button
                        onClick={clearAllFilters}
                        className="w-full px-4 py-2 border-2 border-red-200 text-red-700 rounded-lg hover:bg-red-50 hover:border-red-300 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Limpiar Filtros
                      </button>
                    </div>
                  </div>

                  {/* Indicadores de filtros activos */}
                  {(searchTerm || filterContrato !== "todos" || filterEstado !== "todos" || sortBy !== "recientes") && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-blue-200">
                      <span className="text-sm font-semibold text-blue-700">Filtros activos:</span>
                      
                      {searchTerm && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          Búsqueda: "{searchTerm}"
                          <button
                            onClick={() => setSearchTerm("")}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      
                      {filterContrato !== "todos" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Contrato: {filterContrato}
                          <button
                            onClick={() => setFilterContrato("todos")}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      
                      {filterEstado !== "todos" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          Estado: {filterEstado}
                          <button
                            onClick={() => setFilterEstado("todos")}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      
                      {sortBy !== "recientes" && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Orden: {sortBy}
                          <button
                            onClick={() => setSortBy("recientes")}
                            className="ml-2 text-yellow-600 hover:text-yellow-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Main Layout - Ofertas a la izquierda, Stats a la derecha */}
          <div className="flex gap-8">
            {/* Ofertas List - Lado Izquierdo */}
            <div className="flex-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Mis Ofertas de Empleo
                      </h2>
                    </div>
                    
                    {/* Resultados de búsqueda */}
                    <div className="text-sm text-gray-500">
                      {filteredOfertas.length !== ofertas.length && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          {filteredOfertas.length} de {ofertas.length} ofertas
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
                    </div>
                    <span className="ml-4 text-lg text-gray-600 font-medium">Cargando ofertas...</span>
                  </div>
                ) : filteredOfertas.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    {ofertas.length === 0 ? (
                      <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No hay ofertas disponibles</h3>
                        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">Comienza a construir tu equipo creando tu primera oferta de empleo profesional.</p>
                        <button
                          onClick={openCreateModal}
                          className="inline-flex items-center px-8 py-4 border border-transparent shadow-lg text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                        >
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                          </svg>
                          Crear Primera Oferta
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No se encontraron ofertas</h3>
                        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
                          No hay ofertas que coincidan con los filtros aplicados. 
                          Intenta ajustar los criterios de búsqueda.
                        </p>
                        <button
                          onClick={clearAllFilters}
                          className="inline-flex items-center px-6 py-3 border-2 border-blue-600 shadow-lg text-base font-semibold rounded-xl text-blue-600 bg-white hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Limpiar Filtros
                        </button>
                      </>
                    )}
                  </div>
                ) : (
<div className="divide-y divide-gray-100 space-y-6">
  {filteredOfertas.map((oferta) => (
    <div key={oferta._id} className="p-6 md:p-8 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-300 group border-b border-gray-100 last:border-b-0">
      {/* Header con título y badges */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors break-words">
              {oferta.cargo}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(oferta.estado)} shadow-sm whitespace-nowrap`}>
                {oferta.estado === 'activo' ? '🟢 Activa' : '🟡 Pausada'}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getContractTypeColor(oferta.tipoContrato)} shadow-sm whitespace-nowrap`}>
                📋 {oferta.tipoContrato}
              </span>
            </div>
          </div>
        </div>
        {/* Botones de acción - Responsivos */}
        <div className="flex flex-col sm:flex-row gap-2 lg:ml-4 shrink-0">
          <button
            onClick={() => router.push(`/empresa-dashboard/ofertas/${oferta._id}/postulados`)}
            className="group inline-flex items-center justify-center px-4 py-2 border-2 border-blue-200 text-sm font-semibold rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Postulados
          </button>
          
          <button
            onClick={() => startEdit(oferta)}
            className="group inline-flex items-center justify-center px-4 py-2 border-2 border-amber-200 text-sm font-semibold rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-500 hover:text-white hover:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/25 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
          
          <button
            onClick={() => openDeleteModal(oferta._id)}
            className="group inline-flex items-center justify-center px-4 py-2 border-2 border-red-200 text-sm font-semibold rounded-lg text-red-700 bg-red-50 hover:bg-red-600 hover:text-white hover:border-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/25 transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
      
      {/* Grid de información - Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center bg-green-50 rounded-lg px-4 py-3 border border-green-200">
          <div className="p-2 bg-green-100 rounded-lg mr-3 shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-green-700">Salario</p>
            <p className="font-bold text-green-800 truncate">${oferta.salario?.toLocaleString()}</p>
          </div>
        </div>
        
        {oferta.direccion && (
          <div className="flex items-center bg-blue-50 rounded-lg px-4 py-3 border border-blue-200">
            <div className="p-2 bg-blue-100 rounded-lg mr-3 shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-blue-700">Ubicación</p>
              <p className="font-semibold text-blue-800 truncate" title={oferta.direccion}>{oferta.direccion}</p>
            </div>
          </div>
        )}
        
        {oferta.telefono && (
          <div className="flex items-center bg-purple-50 rounded-lg px-4 py-3 border border-purple-200">
            <div className="p-2 bg-purple-100 rounded-lg mr-3 shrink-0">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-purple-700">Contacto</p>
              <p className="font-semibold text-purple-800 truncate">{oferta.telefono}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Descripción */}
      {oferta.descripcion && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-gray-700 leading-relaxed line-clamp-3 break-words">{oferta.descripcion}</p>
        </div>
      )}
    </div>
  ))}
</div>
                )}
              </div>
            </div>

            {/* Stats Cards - Lado Derecho */}
            <div className="w-80 space-y-6">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-blue-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Ofertas</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{ofertas.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg group-hover:shadow-emerald-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Ofertas Activas</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {ofertas.filter(o => o.estado === 'activo').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg group-hover:shadow-amber-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Ofertas Pausadas</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {ofertas.filter(o => o.estado === 'inactivo').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Create/Edit */}
        {showModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-2">
    <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-300">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {editId ? '✏️ Editar Oferta' : '🆕 Nueva Oferta de Empleo'}
          </h3>
        </div>
        <button
          onClick={closeModal}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleCreateOrUpdate} className="p-4">
        {/* grid de 3 columnas en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campos normales en col-span-2 */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                💼 Cargo / Posición *
              </label>
              <input
                type="text"
                className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-base font-medium transition-all duration-200"
                placeholder="Ej: Desarrollador Frontend Senior"
                value={form.cargo}
                onChange={e => setForm({...form, cargo: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  💰 Salario *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-base font-bold">$</span>
                  <input
                    type="number"
                    className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-base font-medium transition-all duration-200"
                    placeholder="1.500.000"
                    value={form.salario}
                    onChange={e => setForm({...form, salario: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  📋 Tipo de Contrato
                </label>
                <select
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-base font-medium transition-all duration-200 bg-white"
                  value={form.tipoContrato}
                  onChange={e => setForm({...form, tipoContrato: e.target.value})}
                >
                  <option value="indefinido">Indefinido</option>
                  <option value="obra labor">Obra labor</option>
                  <option value="prestacion de servicio">Prestación de servicio</option>
                  <option value="temporal">Temporal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  📍 Dirección
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-base font-medium transition-all duration-200"
                  placeholder="Ej: Bogotá, Colombia"
                  value={form.direccion}
                  onChange={e => setForm({...form, direccion: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  📞 Teléfono de Contacto
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-base font-medium transition-all duration-200"
                  placeholder="Ej: +57 300 123 4567"
                  value={form.telefono}
                  onChange={e => setForm({...form, telefono: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                ⚡ Estado
              </label>
              <select
                className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-base font-medium transition-all duration-200 bg-white"
                value={form.estado}
                onChange={e => setForm({...form, estado: e.target.value})}
              >
                <option value="activo">🟢 Activo</option>
                <option value="inactivo">🟡 Pausado</option>
              </select>
            </div>
          </div>

          {/* Descripción a la derecha */}
          <div className="space-y-4">
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              📝 Descripción del Puesto
            </label>
<textarea
  rows={6} // menos filas por defecto
  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-base font-medium transition-all duration-200 resize-y" 
  placeholder="Describe las responsabilidades, requisitos y beneficios del puesto..."
  value={form.descripcion}
  onChange={e => setForm({...form, descripcion: e.target.value})}
/>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-3 border border-gray-300 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/25 transition-all duration-200 transform hover:scale-105"
          >
            ❌ Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-3 border border-transparent rounded-lg shadow-lg text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/25 transition-all duration-200 transform hover:scale-105"
          >
            {editId ? '✏️ Actualizar Oferta' : '🆕 Crear Oferta'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white/20 transform transition-all duration-300">
              <div className="p-8">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-red-100 to-red-200 mb-6">
                    <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">⚠️ Confirmar Eliminación</h3>
                  <div className="mb-8">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      ¿Estás seguro que deseas eliminar esta oferta de empleo? 
                      <br />
                      <span className="font-semibold text-red-600">Esta acción no se puede deshacer.</span>
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl text-base font-semibold hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500/25 transition-all duration-200 transform hover:scale-105"
                    >
                      ❌ Cancelar
                    </button>
                    <button
                      onClick={() => handleDelete(deleteId)}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-base font-bold hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-500/25 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}