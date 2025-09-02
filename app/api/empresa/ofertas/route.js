import { ObjectId } from "mongodb";
import connectDB from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const empresaId = searchParams.get("empresaId");
  const search = searchParams.get("search") || "";

  if (!empresaId) return new Response(JSON.stringify([]), { status: 200 });

  const db = await connectDB();
  let query = { empresaId };
  if (search) query.cargo = { $regex: search, $options: "i" };

  const ofertas = await db.collection("ofertas").find(query).toArray();
  return new Response(JSON.stringify(ofertas), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const db = await connectDB();
  const result = await db.collection("ofertas").insertOne(body);
  
  if (!result.acknowledged) {
    return new Response(JSON.stringify({ error: "No se pudo crear la oferta" }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: "Oferta creada", id: result.insertedId }), { status: 201 });
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "ID no proporcionado" }), { status: 400 });

  const body = await req.json();
  const db = await connectDB();
  await db.collection("ofertas").updateOne({ _id: new ObjectId(id) }, { $set: body });
  return new Response(JSON.stringify({ message: "Oferta actualizada" }), { status: 200 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "ID no proporcionado" }), { status: 400 });

  const db = await connectDB();
  await db.collection("ofertas").deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({ message: "Oferta eliminada" }), { status: 200 });
}
