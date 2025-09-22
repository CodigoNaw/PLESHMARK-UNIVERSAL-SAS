// app/api/empresa/ofertas/inscritos/route.js
import dbConnect from "@/lib/mongodb";
import Postulacion from "@/models/Postulacion";

export async function POST(req) {
  await dbConnect();
  const body = await req.json(); // { oferta, usuario }

  try {
    // evita duplicados: mismo usuario a misma oferta
    const existe = await Postulacion.findOne({ oferta: body.oferta, usuario: body.usuario });
    if (existe) {
      return new Response(JSON.stringify({ error: "Ya te postulaste" }), { status: 400 });
    }
    const p = await Postulacion.create(body);
    return new Response(JSON.stringify(p), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
