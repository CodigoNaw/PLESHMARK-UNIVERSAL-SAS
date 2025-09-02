import connectDB from "@/lib/db"; 

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ofertaId = searchParams.get("ofertaId");

  const db = await connectDB();
  const inscritos = await db.collection("postulaciones")
    .find({ ofertaId })
    .toArray();

  return new Response(JSON.stringify(inscritos), { status: 200 });
}
