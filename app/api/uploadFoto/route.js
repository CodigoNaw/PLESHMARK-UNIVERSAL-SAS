import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Administrador from "@/models/Administrador";
import { writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    // Obtener token y usuario
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Leer imagen desde formData
    const data = await req.formData();
    const file = data.get("file");
    if (!file) return NextResponse.json({ error: "No se envió imagen" }, { status: 400 });

    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    // Actualizar usuario
    await Administrador.findByIdAndUpdate(userId, { foto: fileUrl });

    return NextResponse.json({ success: true, foto: fileUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al subir foto" }, { status: 500 });
  }
}
