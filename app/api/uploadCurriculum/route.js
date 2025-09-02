import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Usuario from "@/models/Usuario";
import { v2 as cloudinary } from "cloudinary";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file");
    const userId = formData.get("id");

    console.log("📥 Archivo recibido:", file ? file.name : "Ninguno");
    console.log("📥 ID recibido:", userId);

    if (!file || !userId) {
      return NextResponse.json(
        { error: "Falta archivo o id de usuario" },
        { status: 400 }
      );
    }

    // Convertir archivo a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir a Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto", // detecta PDF o lo que sea
          folder: "curriculums",
          public_id: `${userId}_cv`,
          format: "pdf", // forzar extensión
        },
        (error, result) => {
          if (error) {
            console.error("❌ Error subiendo a Cloudinary:", error);
            reject(error);
          } else {
            console.log("✅ Subida a Cloudinary:", result.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    // Guardar en Mongo
    const usuario = await Usuario.findByIdAndUpdate(
      userId,
      { pdfCurriculum: uploadResponse.secure_url },
      { new: true }
    );

    if (!usuario) {
      console.error("❌ Usuario no encontrado en Mongo:", userId);
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    console.log("✅ Usuario actualizado en Mongo:", usuario);

    return NextResponse.json({ success: true, usuario });
  } catch (error) {
    console.error("❌ Error en /api/uploadCurriculum:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
