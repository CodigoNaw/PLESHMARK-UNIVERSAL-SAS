import { FaInstagram, FaFacebook, FaTiktok, FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row py-12 px-6 lg:px-12 gap-12">
          
          {/* Información de contacto */}
          <div className="flex-1 space-y-8">
            <h3 className="text-xl font-bold text-white flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              CONTACTO
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <FaHome className="text-white text-lg" />
                </div>
                <p className="text-gray-300 text-sm">Carrera 18 #49-82</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaPhone className="text-white text-lg" />
                </div>
                <p className="text-gray-300 text-sm">302701157 • 3006843507</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-orange-500 rounded-xl flex items-center justify-center">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <p className="text-gray-300 text-sm">pleshmark@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex-1 space-y-8">
            <h3 className="text-xl font-bold text-white flex items-center">
              <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
              REDES SOCIALES
            </h3>
            <div className="flex gap-6">
              <a href="https://instagram.com/pleshmarkcard" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300">
                <FaInstagram className="text-white text-xl" />
              </a>
              <a href="https://facebook.com/pleshmark" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300">
                <FaFacebook className="text-white text-xl" />
              </a>
              <a href="https://tiktok.com/@pleshmarkfuture" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-gray-700 to-purple-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300">
                <FaTiktok className="text-white text-xl" />
              </a>
            </div>

            {/* Texto agregado debajo */}
            <p className="text-lg text-gray-300 leading-relaxed font-light max-w-md">
              En <span className="text-white font-bold">Pleshmark</span> resolvemos todas tus dudas. 
              Comunícate con nosotros a través de nuestros canales digitales, 
              líneas telefónicas o visítanos en nuestra{" "}
              <span className="text-purple-400 font-semibold">sede principal</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="relative border-t border-gray-800">
        <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">PLESHMARK</span> • Todos los derechos reservados
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <a href="#" className="hover:text-purple-400">Privacidad</a>
              <span>|</span>
              <a href="/terminos-condiciones" className="hover:text-pink-400">Términos</a>
              <span>|</span>
              <a href="#" className="hover:text-blue-400">Soporte</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
