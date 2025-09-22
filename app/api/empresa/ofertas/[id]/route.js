// app/api/empresa/ofertas/[id]/route.js
import dbConnect from "@/lib/mongodb";
import Oferta from "@/models/Oferta";

export async function GET(req, { params }) {
  await dbConnect();
  const oferta = await Oferta.findById(params.id).populate(" nombreEmpresa", "nombre correo");
  if (!oferta) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404 });
  return new Response(JSON.stringify(oferta), { status: 200 });
}
// Editar oferta
export async function PATCH(req, { params }) {
  await dbConnect();
  const body = await req.json();
  try {
    const updated = await Oferta.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) {
      return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

// Eliminar oferta
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deleted = await Oferta.findByIdAndDelete(params.id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Oferta eliminada" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}