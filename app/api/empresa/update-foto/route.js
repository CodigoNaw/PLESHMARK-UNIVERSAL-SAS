import dbConnect from "@/lib/mongodb";
import Empresa from "@/models/Empresa";

export async function PUT(req) {
  try {
    await dbConnect();
    const { id, foto } = await req.json();

    if (!id || !foto) {
      return new Response(JSON.stringify({ error: "ID y foto son requeridos" }), { status: 400 });
    }

    const empresa = await Empresa.findByIdAndUpdate(id, { foto }, { new: true });
    if (!empresa) {
      return new Response(JSON.stringify({ error: "Empresa no encontrada" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Foto actualizada", empresa }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
}
