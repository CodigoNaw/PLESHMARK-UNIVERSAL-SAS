"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UsuarioDashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const menuItems = [
    { icon: "/casita.png", label: "INICIO" },
    { icon: "/postulacion.png", label: "POSTULACIONES" },
    { icon: "/pqr.png", label: "PQRS" },
    { icon: "/archivito.png", label: "OFERTAS" },
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
  }, [router]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  if (!user) return null;

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/fondo15.png')",
        backgroundAttachment: "fixed",
      }}
    >

      <header className="flex items-center justify-between bg-gradient-to-r from-purple-700/90 via-purple-500/90 to-purple-700/90 backdrop-blur-md h-14 px-4 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <span className="text-white font-extrabold text-xl tracking-wider">
            PLESHMARK
          </span>
        </div>

        <div className="flex items-center gap-3">
          <p className="bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-sm border border-white/30">
            Rol: {user.rol}
          </p>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-2xl hover:scale-110 transition-transform"
          >
            {sidebarOpen ? "−" : "☰"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 pt-14">

<aside
  className={`bg-purple-700/90 backdrop-blur-xl border-r border-white/20 flex flex-col justify-between py-8 shadow-xl transition-all duration-500 rounded-br-[15px] ${
    sidebarOpen ? "w-64" : "w-20"
  }`}
>

  <div>

    <div className="flex flex-col items-center mb-4">
      <input
        type="file"
        accept="image/*"
        id="upload-photo"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              document.getElementById("profile-pic").src = reader.result;
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <label htmlFor="upload-photo" className="cursor-pointer">
        <img
          id="profile-pic"
          src="https://via.placeholder.com/80"
          alt="Foto de perfil"
          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md hover:opacity-80 transition"
        />
      </label>
    </div>

    {sidebarOpen && (
      <div className="text-center px-2">
<h2 className="text-white text-2xl font-semibold drop-shadow-lg text-center break-words leading-tight max-w-[150px] mx-auto">
  {user.nombre}
</h2>

        <p className="text-white/80 text-xs drop-shadow-sm">
          cc: {user.numeroDocumento}
        </p>
      </div>
    )}

    <nav className="flex flex-col gap-4 mt-8">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 group"
        >
          <Image
            src={item.icon}
            alt={item.label}
            width={22}
            height={22}
            className="group-hover:scale-110 transition-transform drop-shadow-md"
          />
          {sidebarOpen && (
            <span className="tracking-wide text-sm">{item.label}</span>
          )}
        </a>
      ))}
    </nav>
  </div>
<button
  onClick={() => router.push("/usuario-dashboard/pqrs")}
  className="mt-4 bg-white px-19 py-2 rounded-full font-semibold text-black shadow"
>
  PQRS
</button>


  <div className="px-4">
          <button  onClick={() => {
    localStorage.removeItem("userData"); // o token/cookie que uses
    router.replace("/usuario-login"); // reemplaza sin dejar historial
  }}
   className="bg-red-600 hover:bg-red-700 px-12 py-2 rounded-full font-semibold text-white shadow">
            Cerrar Sesión
          </button>
  </div>
</aside>

        <main className="flex flex-col gap-8 w-full px-10 py-8 bg-[url('/fondo.png')] bg-cover bg-center">
          <section>
            <h2 className="text-lg font-extrabold text-purple-900 mb-2">
              INFORMACION PERSONAL
            </h2>
            <div
              className="bg-gray-200/90 rounded-[30px] p-8 w-full relative"
              style={{
                boxShadow:
                  "10px 10px 20px rgba(186, 85, 255, 0.8), 5px 5px 30px rgba(186, 85, 255, 0.8)",
              }}
            >
              <p>Solo de prueba</p>
              <p>Solo de prueba</p>
              <p>Solo de prueba</p>
              <p>Solo de prueba</p>
            </div>
          </section>

          <section className="relative w-full">
            <h2 className="text-lg font-extrabold text-purple-900 mb-2">
              INFORMACION DE CONTACTO
            </h2>
            <div
              className="bg-gray-200/90 rounded-[30px] p-8 w-full"
              style={{
                boxShadow:
                  "10px 10px 20px rgba(186, 85, 255, 0.8), 5px 5px 30px rgba(186, 85, 255, 0.8)",
              }}
            >
              <p>Solo de prueba</p>
              <p>Solo de prueba</p>
              <p>Solo de prueba</p>
              <p>Solo de prueba</p>
              <p>Solo de prueba</p>
            </div>
            <button
              className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-white text-purple-700 p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-purple-100 transition-all"
              style={{
                boxShadow:
                  "0 0 15px rgba(186, 85, 255, 0.8), 0 0 30px rgba(186, 85, 255, 0.6)",
              }}
            >
              🖋️
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
