// app/api/empresa/ofertas/[id]/inscritos/route.js
import dbConnect from "@/lib/mongodb";
import Postulacion from "@/models/Postulacion";

export async function GET(req, { params }) {
  await dbConnect();
  const postulados = await Postulacion.find({ oferta: params.id }).populate("usuario", "nombre correo telefono");
  return new Response(JSON.stringify(postulados), { status: 200 });
}
