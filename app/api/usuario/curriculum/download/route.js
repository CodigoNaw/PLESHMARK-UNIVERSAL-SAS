import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Usuario from "@/models/Usuario";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Falta ID" }, { status: 400 });
    }

    // Buscar usuario
    const usuario = await Usuario.findById(id);
    if (!usuario || !usuario.pdfCurriculum) {
      return NextResponse.json({ error: "Usuario sin currículum" }, { status: 404 });
    }

    // Descargar el archivo desde Cloudinary
    const response = await fetch(usuario.pdfCurriculum);
    if (!response.ok) {
      throw new Error("No se pudo descargar desde Cloudinary");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Forzar descarga
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="CV-${(usuario.nombre || "usuario").replace(/\s+/g, "-")}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Error en download:", err);
    return NextResponse.json({ error: "Error al descargar archivo" }, { status: 500 });
  }
}
