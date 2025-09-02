import { connectDB } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  const db = await connectDB();
  const existe = await db.collection("postulaciones").findOne({
    ofertaId: body.ofertaId,
    usuarioId: body.usuarioId
  });

  if (existe) return new Response(JSON.stringify({ message: "Ya postulado" }), { status: 400 });

  const result = await db.collection("postulaciones").insertOne(body);
  return new Response(JSON.stringify(result), { status: 201 });
}
