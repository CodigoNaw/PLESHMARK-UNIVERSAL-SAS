// app/api/usuario/[id]/route.js
import dbConnect from "@/lib/mongodb";
import Usuario from "@/models/Usuario";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const usuario = await Usuario.findById(params.id);
    if (!usuario) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(usuario), { status: 200 });
  } catch (error) {
    console.error("Error en GET usuario:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
