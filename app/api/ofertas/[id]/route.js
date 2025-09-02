import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Oferta from "@/models/Oferta";
import mongoose from "mongoose";

// GET → obtener oferta por id
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const oferta = await Oferta.findById(id).lean();
    if (!oferta) {
      return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 });
    }

    return NextResponse.json(oferta);
  } catch (err) {
    console.error("Error GET oferta:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT → actualizar oferta por id
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
    }

    // Destructuramos solo los campos permitidos
    const { cargo, salario, direccion, descripcion, estado, telefono, tipoContrato } = body;

    // Validaciones básicas
    if (cargo && typeof cargo !== "string") {
      return NextResponse.json({ error: "Cargo inválido" }, { status: 400 });
    }

    if (salario && isNaN(Number(salario))) {
      return NextResponse.json({ error: "Salario inválido" }, { status: 400 });
    }

    const updatedFields = {
      ...(cargo !== undefined && { cargo: cargo.trim() }),
      ...(salario !== undefined && { salario: Number(salario) }),
      ...(direccion !== undefined && { direccion }),
      ...(descripcion !== undefined && { descripcion }),
      ...(estado !== undefined && { estado }), // "activo" o "inactivo"
      ...(telefono !== undefined && { telefono }),
      ...(tipoContrato !== undefined && { tipoContrato }),
    };

    const oferta = await Oferta.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!oferta) {
      return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 });
    }

    return NextResponse.json(oferta);
  } catch (err) {
    console.error("Error PUT oferta:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE → eliminar oferta por id
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const deleted = await Oferta.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Oferta eliminada correctamente",
      id: deleted._id,
    });
  } catch (err) {
    console.error("Error DELETE oferta:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
