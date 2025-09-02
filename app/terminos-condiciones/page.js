import Navbar from "../components/pagina inicial/Navbar";// app/terminos-y-condiciones/page.js

export const metadata = {
  title: "Términos y Condiciones | Pleshmark",
  description: "Lee los términos y condiciones de uso de Pleshmark.",
};

export default function TerminosPage() {
  return (
    <>
     <Navbar/>
<div
  className="min-h-screen w-full flex items-center justify-center bg-no-repeat bg-center"
  style={{
    backgroundImage: "url('/q1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",  // ¡Aquí está lo clave!
  }}
>
      <main className="bg-white/80 backdrop-blur-sm max-w-3xl mx-4 p-30 text-sm leading-relaxed text-zinc-800 rounded-lg shadow-lg">

        
      <h1 className="text-2xl font-bold mb-4">📄 TÉRMINOS Y CONDICIONES DE USO – PLESHMARK</h1>
      <p className="mb-4">Última actualización: 31/08/2025</p>

      <p className="mb-6">
        Bienvenido a <strong>Pleshmark</strong>, una plataforma digital que conecta a personas que buscan empleo con empresas que publican oportunidades laborales. 
        Al acceder, registrarte o utilizar Pleshmark, aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, por favor no utilices la plataforma.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-2">🧾 3. PLANES Y PAGOS</h2>

        <h3 className="font-semibold mt-4">3.1 Adquisición de Planes</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Mayor visibilidad de sus ofertas.</li>
          <li>Acceso a más postulantes.</li>
          <li>Herramientas de gestión avanzada.</li>
        </ul>
        <p>
          El procedimiento para adquirir un plan se realiza de forma personalizada por chat.
          <br />
          ✅ <em>Base Legal:</em> Principio de autonomía de la voluntad (art. 958 CCyC Argentina u otras jurisdicciones).
        </p>

        <h3 className="font-semibold mt-4">3.2 Información sobre Precios y Condiciones</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Precio total en moneda local.</li>
          <li>Condiciones del servicio.</li>
          <li>Duración del acceso.</li>
          <li>Detalles de lo incluido y no incluido.</li>
        </ul>
        <p>🛡️ Base Legal: Leyes de defensa del consumidor aplicables en tu país.</p>

        <h3 className="font-semibold mt-4">3.3 Cambios en Planes o Tarifas</h3>
        <ul className="list-disc list-inside mb-4">
          <li>No afecta a planes ya contratados.</li>
          <li>Notificación previa de cambios.</li>
        </ul>
        <p>📣 Principio de Buena Fe Contractual.</p>

        <h3 className="font-semibold mt-4">3.4 Forma de Pago</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Transferencias bancarias.</li>
          <li>Billeteras digitales.</li>
          <li>Otros medios autorizados.</li>
        </ul>
        <p>❗ Nunca se solicitan contraseñas ni datos sensibles por fuera de los canales oficiales.</p>

        <h3 className="font-semibold mt-4">3.5 Política de Reembolsos</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Sin reembolsos, salvo excepciones específicas.</li>
          <li>Errores técnicos o fraude comprobado.</li>
          <li>Casos autorizados por soporte.</li>
        </ul>
        <p>❌ En relaciones B2B, el derecho a retracto puede no aplicar según la ley local.</p>

        <h3 className="font-semibold mt-4">3.6 Facturación y Comprobantes</h3>
        <p>
          Se emite comprobante fiscal conforme a la normativa del país. 
          Es responsabilidad de la empresa proporcionar los datos fiscales correctos.
        </p>

        <h3 className="font-semibold mt-4">3.7 Fraude y Evasión de Pago</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Prohibido evadir tarifas.</li>
          <li>Prohibido simular servicios gratuitos.</li>
          <li>Prohibido pagar por fuera de canales oficiales.</li>
        </ul>
        <p>⚠️ Pleshmark puede suspender o eliminar cuentas infractoras y tomar medidas legales.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-2">🔐 4. PRIVACIDAD Y PROTECCIÓN DE DATOS</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Tu información se guarda de forma segura.</li>
          <li>No se vende ni comparte sin consentimiento.</li>
          <li>Las empresas solo ven datos básicos de los candidatos.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-2">📌 5. NORMAS DE USO</h2>
        <h3 className="font-semibold mt-4">🔴 Conductas Prohibidas</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Falsificar identidad o experiencia laboral.</li>
          <li>Publicar contenido ofensivo o ilegal.</li>
          <li>Acoso o lenguaje amenazante.</li>
          <li>Ofertas de empleo falsas o estafas.</li>
          <li>Solicitar pagos indebidos.</li>
        </ul>

        <h3 className="font-semibold mt-4">🔒 Seguridad y Acceso</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Responsabilidad individual por la cuenta.</li>
          <li>No compartir credenciales ni acceder a cuentas ajenas.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-2">🚫 6. SANCIONES Y ELIMINACIÓN DE CUENTAS</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Advertencias formales.</li>
          <li>Suspensión temporal.</li>
          <li>Eliminación definitiva sin reembolso.</li>
        </ul>
        <p>
          El administrador puede actuar sin previo aviso si detecta una infracción grave.
        </p>
      </section>

    </main>
           </div>
    </>
  );
}
