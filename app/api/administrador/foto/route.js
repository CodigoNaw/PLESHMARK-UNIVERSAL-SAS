import dbConnect from "@/lib/mongodb";
import Administrador from "@/models/Administrador";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("foto");
    const id = formData.get("id");

    if (!file || !id) {
      console.error("Faltan datos:", { tieneFile: !!file, id });
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    // 📂 Ruta absoluta a /public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Crear carpeta si no existe
    if (!fs.existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
      console.log("📁 Carpeta /uploads creada");
    }

    // Guardar archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    const urlFoto = `/uploads/${fileName}`;

    // 🔄 Guardar en Mongo (modelo Administrador)
    const admin = await Administrador.findByIdAndUpdate(id, { foto: urlFoto }, { new: true });

    if (!admin) {
      console.error("❌ Administrador no encontrado:", id);
      return new Response(JSON.stringify({ error: "Administrador no encontrado" }), { status: 404 });
    }

    console.log("✅ Foto subida correctamente:", urlFoto);

    return new Response(
      JSON.stringify({ message: "Foto actualizada", foto: urlFoto }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error subiendo foto:", error);
    return new Response(JSON.stringify({ error: "Error subiendo foto" }), { status: 500 });
  }
}
