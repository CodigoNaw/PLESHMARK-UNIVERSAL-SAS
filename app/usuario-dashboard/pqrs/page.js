"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  MdEmail, 
  MdAdd, 
  MdDescription, 
  MdLabel, 
  MdSend, 
  MdHistory, 
  MdAccessTime,
  MdCheckCircle,
  MdPendingActions,
  MdQuestionAnswer
} from 'react-icons/md';
import { 
  FaHandPeace, 
  FaSadTear, 
  FaExclamationTriangle, 
  FaLightbulb 
} from 'react-icons/fa';
import { HiDocumentText, HiClock } from 'react-icons/hi';


export default function PqrsForm() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [motivo, setMotivo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [misPqrs, setMisPqrs] = useState([]);
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);


  const menuItems = [
    { icon: "/casita.png", label: "INICIO", link: "/usuario-dashboard" },
    { icon: "/postulacion.png", label: "CURRICULUM", link: "/usuario-dashboard/curriculum" },
    { icon: "/pqr.png", label: "PQRS", link: "/usuario-dashboard/pqrs" },
    { icon: "/archivito.png", label: "OFERTAS", link: "/usuario-dashboard/ofertas" },
  ];

useEffect(() => {
  const data = getUserData();
  if (!data) {
    router.push("/");
    return;
  }
  if (data.rol !== "usuario" && data.rol !== "empresa") {
    router.push("/");
    return;
  }
  setUser(data);
  setPreview(data.foto || null); // <- aquí ponemos la foto si existe
  fetchMisPQRS(data.id || data._id);
}, [router]);
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setPreview(URL.createObjectURL(file)); // mostrar vista previa inmediatamente

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
    setPreview(data.foto); // actualizar la foto que se muestra
    localStorage.setItem("userData", JSON.stringify(updatedUsuario));
  } catch (err) {
    console.error("Error subiendo foto:", err);
    alert("Error al subir foto");
  } finally {
    setLoading(false);
  }
};
  const fetchMisPQRS = async (id) => {
    try {
      const res = await fetch(`/api/pqrs?usuarioId=${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMisPqrs(data);
    } catch (error) {
      console.error("Error cargando PQRS:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!motivo || !tipo || !descripcion) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch("/api/pqrs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: user.id || user._id,
          rol: user.rol,
          correo: user.correo,
          motivo,
          tipo,
          descripcion,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("PQRS enviada correctamente ✅");
      setMotivo("");
      setTipo("");
      setDescripcion("");
      fetchMisPQRS(user.id || user._id);
    } catch (error) {
      console.error("Error enviando PQRS:", error);
      alert("No se pudo enviar la PQRS");
    }
  };

  if (!user) return null;

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
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
    <input 
      type="file" 
      accept="image/*" 
      id="upload-photo" 
      className="hidden" 
      onChange={handleImageUpload} 
    />
    <label htmlFor="upload-photo" className="cursor-pointer relative group">
<div className="relative">
  {sidebarOpen ? (
    // Avatar Mega Ultra Pro más grande
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
  )}

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




              {/* Main */}
              <main
  className={`flex-1 px-8 py-6 overflow-y-auto transition-all duration-500 bg-gray-50/50 min-h-screen ${
    sidebarOpen ? "ml-60" : "ml-20"
  } mt-5`}
>
  {/* Header Section */}
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
        <MdEmail className="w-5 h-5 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">
        Sistema PQRS
      </h1>
    </div>
    <p className="text-gray-600 text-lg">
      Gestiona tus peticiones, quejas, reclamos y sugerencias de manera eficiente
    </p>
  </div>

  {/* Formulario */}
  <div className="mb-12">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header del formulario */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <MdAdd className="w-6 h-6" />
          Nueva Solicitud PQRS
        </h2>
        <p className="text-purple-100 mt-1">
          Complete el formulario para enviar su solicitud
        </p>
      </div>

      {/* Contenido del formulario */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MdDescription className="w-4 h-4 text-purple-600" />
              Motivo *
            </label>
            <input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Describe brevemente el motivo de tu solicitud"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MdLabel className="w-4 h-4 text-purple-600" />
              Tipo de Solicitud *
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-white"
            >
              <option value="">Selecciona el tipo de solicitud</option>
              <option value="petición">🙏 Petición</option>
              <option value="queja">😟 Queja</option>
              <option value="reclamo">⚠️ Reclamo</option>
              <option value="sugerencia">💡 Sugerencia</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MdQuestionAnswer className="w-4 h-4 text-purple-600" />
            Descripción Detallada *
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
            rows="5"
            placeholder="Describe detalladamente tu situación, incluyendo fechas, nombres y cualquier información relevante que pueda ayudar a resolver tu solicitud..."
          />
          <div className="text-xs text-gray-500 mt-1">
            Proporciona la mayor cantidad de detalles posible para una mejor atención
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <MdSend className="w-5 h-5" />
            Enviar Solicitud PQRS
          </button>
        </div>
      </form>
    </div>
  </div>

  {/* Listado de PQRS enviadas */}
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    {/* Header de la tabla */}
    <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <MdHistory className="w-6 h-6 text-purple-600" />
        Historial de Solicitudes PQRS
      </h2>
      <p className="text-gray-600 mt-1">
        Seguimiento del estado de todas tus solicitudes enviadas
      </p>
    </div>

    {/* Contenido de la tabla */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Información de la Solicitud
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Respuesta
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {misPqrs.length > 0 ? (
            misPqrs.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {p.motivo}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date().toLocaleDateString('es-ES')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2">
                    {p.tipo === "petición" && <FaHandPeace className="text-blue-500 w-4 h-4" />}
                    {p.tipo === "queja" && <FaSadTear className="text-orange-500 w-4 h-4" />}
                    {p.tipo === "reclamo" && <FaExclamationTriangle className="text-red-500 w-4 h-4" />}
                    {p.tipo === "sugerencia" && <FaLightbulb className="text-green-500 w-4 h-4" />}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {p.tipo}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {p.estado === "pendiente" ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                      <MdPendingActions className="w-3 h-3 mr-1" />
                      En revisión
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      <MdCheckCircle className="w-3 h-3 mr-1" />
                      Respondido
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs">
                    {p.respuesta ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800">{p.respuesta}</p>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic flex items-center gap-2">
                        <HiClock className="w-4 h-4" />
                        Esperando respuesta
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <HiDocumentText className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      No hay solicitudes PQRS
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Aún no has enviado ninguna solicitud. Utiliza el formulario anterior para crear tu primera PQRS.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</main>
      </div>
    </div>
  );
}
