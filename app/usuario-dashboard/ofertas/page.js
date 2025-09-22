// app/usuario-dashboard/ofertas/page.js
"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import Link from "next/link";
import Image from "next/image";
export default function UsuarioOfertasPage() {
  const [ofertas, setOfertas] = useState([]);
  const [ofertasFiltradas, setOfertasFiltradas] = useState([]);
  const [userId, setUserId] = useState(null);
  const [aplicando, setAplicando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    busqueda: "",
    tipoContrato: "",
    salarioMin: "",
    salarioMax: ""
  });
  const [showFilters, setShowFilters] = useState(false);
    const menuItems = [
    { icon: "/casita.png", label: "INICIO", link: "/usuario-dashboard" },
    { icon: "/postulacion.png", label: "CURRICULUM", link: "/usuario-dashboard/curriculum" },
    { icon: "/pqr.png", label: "PQRS", link: "/usuario-dashboard/pqrs" },
    { icon: "/archivito.png", label: "OFERTAS", link: "/usuario-dashboard/ofertas" },
  ];


  useEffect(() => {
    fetchOffers();
    (async () => {
      const u = await getUserData();
      setUserId(u?._id || u?.id);
    })();
  }, []);

  useEffect(() => {
    filtrarOfertas();
  }, [ofertas, filtros]);

  async function fetchOffers() {
    setLoading(true);
    try {
      const res = await fetch("/api/empresa/ofertas");
      const data = await res.json();
      // Solo mostrar ofertas activas
      const ofertasActivas = data.filter(o => o.estado === 'activo');
      setOfertas(ofertasActivas);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
    setLoading(false);
  }

  function filtrarOfertas() {
    let filtered = ofertas;

    // Filtro por búsqueda
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      filtered = filtered.filter(o => 
        o.cargo?.toLowerCase().includes(busqueda) ||
        o.descripcion?.toLowerCase().includes(busqueda) ||
        o.empresa?.nombreEmpresa?.toLowerCase().includes(busqueda)
      );
    }

    // Filtro por tipo de contrato
    if (filtros.tipoContrato) {
      filtered = filtered.filter(o => o.tipoContrato === filtros.tipoContrato);
    }

    // Filtro por salario
    if (filtros.salarioMin) {
      filtered = filtered.filter(o => o.salario >= Number(filtros.salarioMin));
    }
    if (filtros.salarioMax) {
      filtered = filtered.filter(o => o.salario <= Number(filtros.salarioMax));
    }

    setOfertasFiltradas(filtered);
  }

  async function handlePostular(ofertaId) {
    if (!userId) return alert("Inicia sesión primero.");
    setAplicando(ofertaId);
    const res = await fetch("/api/empresa/ofertas/inscritos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oferta: ofertaId, usuario: userId })
    });
    const body = await res.json();
    setAplicando(null);
    if (!res.ok) return alert(body.error || "Error al postularse");
    alert("Postulación enviada");
  }

  const getContractTypeColor = (tipo) => {
    const colors = {
      'indefinido': 'bg-green-100 text-green-800 border-green-200',
      'obra labor': 'bg-blue-100 text-blue-800 border-blue-200',
      'prestacion de servicio': 'bg-purple-100 text-purple-800 border-purple-200',
      'temporal': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      tipoContrato: "",
      salarioMin: "",
      salarioMax: ""
    });
  };

  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

<nav className="flex items-center justify-between 
  bg-gradient-to-b from-purple-800 to-indigo-900 
  backdrop-blur-xl border-b border-white/20 
  text-white px-6 py-3 shadow-xl transition-all duration-500">        <div className="flex space-x-6">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.link} className="flex items-center space-x-2 hover:text-blue-300">
              <Image src={item.icon} alt={item.label} width={20} height={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

      </nav>
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Encuentra tu Empleo Ideal</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Descubre {ofertas.length} oportunidades laborales disponibles
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtros
              </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar por cargo, empresa o descripción..."
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar con filtros */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
                <button
                  onClick={limpiarFiltros}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Limpiar
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Contrato
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filtros.tipoContrato}
                    onChange={(e) => setFiltros({...filtros, tipoContrato: e.target.value})}
                  >
                    <option value="">Todos</option>
                    <option value="indefinido">Indefinido</option>
                    <option value="obra labor">Obra labor</option>
                    <option value="prestacion de servicio">Prestación de servicio</option>
                    <option value="temporal">Temporal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rango Salarial
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Salario mínimo"
                        value={filtros.salarioMin}
                        onChange={(e) => setFiltros({...filtros, salarioMin: e.target.value})}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Salario máximo"
                        value={filtros.salarioMax}
                        onChange={(e) => setFiltros({...filtros, salarioMax: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de ofertas */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Cargando ofertas...</span>
              </div>
            ) : ofertasFiltradas.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron ofertas</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Prueba ajustando los filtros de búsqueda.
                </p>
                <div className="mt-6">
                  <button
                    onClick={limpiarFiltros}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Mostrando {ofertasFiltradas.length} de {ofertas.length} ofertas
                  </p>
                </div>

                <div className="space-y-4">
                  {ofertasFiltradas.map((oferta) => (
                    <div key={oferta._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-xl font-semibold text-gray-900">{oferta.cargo}</h3>
                              <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border ${getContractTypeColor(oferta.tipoContrato)}`}>
                                {oferta.tipoContrato}
                              </span>
                            </div>

                            <div className="flex items-center mb-3">
                              <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 8h10M7 12h10m-10 4h7" />
                                </svg>
                                <span className="font-medium text-gray-900">
                                  {oferta.empresa?.nombreEmpresa || "Empresa"}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                <span className="font-semibold text-green-600">
                                  ${oferta.salario?.toLocaleString()}
                                </span>
                              </div>

                              {oferta.direccion && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <span>{oferta.direccion}</span>
                                </div>
                              )}

                              {oferta.telefono && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  <span>{oferta.telefono}</span>
                                </div>
                              )}
                            </div>

                            {oferta.descripcion && (
                              <div className="mb-4">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {oferta.descripcion.length > 200 
                                    ? `${oferta.descripcion.slice(0, 200)}...`
                                    : oferta.descripcion
                                  }
                                </p>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center text-xs text-gray-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Publicado recientemente
                              </div>

                              <button
                                onClick={() => handlePostular(oferta._id)}
                                disabled={aplicando === oferta._id}
                                className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg transition-all duration-200 ${
                                  aplicando === oferta._id
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg'
                                }`}
                              >
                                {aplicando === oferta._id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                                    Enviando...
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Postularme
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}