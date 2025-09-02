import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Oferta from "@/models/Oferta";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const empresaId = searchParams.get("empresaId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 4;

    const query = {};
    if (empresaId) query.empresa = empresaId;

    const ofertas = await Oferta.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Oferta.countDocuments(query);

    return NextResponse.json({
      ofertas,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error GET ofertas:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const empresaId = body.empresaId || body.empresa;
    if (!empresaId) return NextResponse.json({ error: "Falta id de empresa" }, { status: 400 });

    const nuevaOferta = await Oferta.create({
      cargo: body.cargo?.trim(),
      salario: Number(body.salario),
      direccion: body.direccion || "",
      descripcion: body.descripcion || "",
      empresa: empresaId,
      estado: body.estado || "activo",
      telefono: body.telefono || "",
      tipoContrato: body.tipoContrato || "indefinido",
    });

    return NextResponse.json(nuevaOferta, { status: 201 });
  } catch (err) {
    console.error("Error POST oferta:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // toma el id de /api/ofertas/:id
    if (!id) return NextResponse.json({ error: "Falta ID" }, { status: 400 });

    const ofertaActualizada = await Oferta.findByIdAndUpdate(
      id,
      {
        cargo: body.cargo?.trim(),
        salario: Number(body.salario),
        direccion: body.direccion || "",
        descripcion: body.descripcion || "",
        estado: body.estado || "activo",
        telefono: body.telefono || "",
        tipoContrato: body.tipoContrato || "indefinido",
      },
      { new: true }
    );

    if (!ofertaActualizada) return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 });

    return NextResponse.json(ofertaActualizada);
  } catch (err) {
    console.error("Error PUT oferta:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // toma el id de /api/ofertas/:id
    if (!id) return NextResponse.json({ error: "Falta ID" }, { status: 400 });

    await Oferta.findByIdAndDelete(id);
    return NextResponse.json({ message: "Oferta eliminada" });
  } catch (err) {
    console.error("Error DELETE oferta:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
