import dbConnect from "@/lib/db";
import Postulacion from "@/models/Postulacion";
import { NextResponse } from "next/server";

// POST: un usuario se postula a una oferta
export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const existe = await Postulacion.findOne({
    ofertaId: body.ofertaId,
    correo: body.correo, // para que no se postule 2 veces
  });

  if (existe) {
    return NextResponse.json({ error: "Ya estás inscrito a esta oferta" }, { status: 400 });
  }

  const postulacion = await Postulacion.create(body);
  return NextResponse.json(postulacion);
}
