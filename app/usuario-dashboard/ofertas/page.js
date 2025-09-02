"use client";
import { useState, useEffect } from "react";
import { getUserData } from "@/utils/getUserData";

export default function UsuarioOfertasPage() {
  const user = getUserData();
  const [ofertas, setOfertas] = useState([]);
  const [filtro, setFiltro] = useState("");

  const fetchOfertas = async () => {
    const res = await fetch(`/api/empresa/ofertas?search=${filtro}`);
    const data = await res.json();
    setOfertas(data);
  };

  useEffect(() => { fetchOfertas(); }, [filtro]);

  const handlePostular = async (id) => {
    await fetch(`/api/usuario/postulaciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ofertaId: id, usuarioId: user.id, nombre: user.nombre, numeroDocumento: user.numeroDocumento, telefono: user.telefono, pdfCurriculum: user.pdfCurriculum })
    });
    alert("Postulado correctamente");
  };

  return (
    <div>
      <input placeholder="Buscar por cargo o empresa" value={filtro} onChange={e => setFiltro(e.target.value)} />
      <div className="cards">
        {ofertas.slice(0,6).map(o => (
          <div key={o._id} className="card">
            <h2>{o.cargo}</h2>
            <p>{o.empresaNombre}</p>
            <p>{o.salario}</p>
            <p>{o.direccion}</p>
            <button onClick={() => handlePostular(o._id)}>Postularse</button>
          </div>
        ))}
      </div>
    </div>
  );
}
