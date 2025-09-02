import dbConnect from "@/lib/mongodb";
import Pqrs from "@/models/Pqrs";
import jwt from "jsonwebtoken";



export async function GET(req) {
  try {
    await dbConnect();

    // Token en header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Token requerido" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Token inválido o expirado" }), { status: 403 });
    }

    // Solo el administrador puede ver todos
    if (decoded.rol !== "admin") {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 403 });
    }

    // Listar todos los PQRS
    // Listar solo los últimos 4 PQRS
// Listar solo los 4 últimos PQRS y devolver array
// Obtener parámetros de paginación desde la URL
const { searchParams } = new URL(req.url);
const page = parseInt(searchParams.get("page") || "1");
const limit = parseInt(searchParams.get("limit") || "6");
const skip = (page - 1) * limit;

// Consulta con paginación
const [pqrs, total] = await Promise.all([
  Pqrs.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
  Pqrs.countDocuments()
]);

return new Response(
  JSON.stringify({
    pqrs,
    total,
    page,
    pages: Math.ceil(total / limit)
  }),
  { status: 200 }
);


  } catch (err) {
    console.error("Error listando todos los PQRS:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  }
}
