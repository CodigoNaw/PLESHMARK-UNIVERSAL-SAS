"use client";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { useRouter } from "next/navigation";

export default function PqrsForm() {
  const [user, setUser] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [misPqrs, setMisPqrs] = useState([]);
  const router = useRouter();

  // ✅ Validar rol
  useEffect(() => {
    const data = getUserData();
    if (!data) {
      router.push("/"); // redirigir si no hay sesión
      return;
    }
    if (data.rol !== "usuario" && data.rol !== "empresa") {
      router.push("/"); // solo estos roles pueden enviar PQRS
      return;
    }
    setUser(data);
    fetchMisPQRS(data.id || data._id);
  }, [router]);

  // ✅ Obtener PQRS del usuario/empresa
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

  // ✅ Enviar PQRS
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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">📩 Enviar PQRS</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 shadow-md mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Motivo</label>
            <input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Ej: Problema con la plataforma"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option value="">Selecciona un tipo</option>
              <option value="petición">Petición</option>
              <option value="queja">Queja</option>
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
            rows="4"
            placeholder="Explica tu situación..."
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Enviar PQRS
        </button>
      </form>

      {/* Listado de PQRS enviadas */}
      <h2 className="text-xl font-semibold text-purple-700 mb-3">
        📜 Mis PQRS
      </h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-purple-700 text-white uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-3">Motivo</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Respuesta</th>
            </tr>
          </thead>
          <tbody>
            {misPqrs.length > 0 ? (
              misPqrs.map((p) => (
                <tr key={p._id} className="border-b hover:bg-purple-100">
                  <td className="px-4 py-2">{p.motivo}</td>
                  <td className="px-4 py-2">{p.tipo}</td>
                  <td className="px-4 py-2">
                    {p.estado === "pendiente" ? (
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Pendiente
                      </span>
                    ) : (
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                        Respondido
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {p.respuesta ? p.respuesta : "Sin respuesta aún"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Aún no has enviado PQRS
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
