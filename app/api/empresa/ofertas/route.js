// app/api/empresa/ofertas/route.js
import dbConnect from "@/lib/mongodb";
import Oferta from "@/models/Oferta";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    // body debe incluir: cargo, empresa (id), salario, ... 
    const nueva = await Oferta.create(body);
    return new Response(JSON.stringify(nueva), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const ofertas = await Oferta.find().populate("nombreEmpresa", "nombre correo"); // populate empresa nombre si existe
  return new Response(JSON.stringify(ofertas), { status: 200 });
}

// Editar oferta
