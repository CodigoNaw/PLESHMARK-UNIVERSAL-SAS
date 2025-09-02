import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/mongodb";
import Usuario from "@/models/Usuario";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("curriculum");
    const id = formData.get("id");

    if (!file || !id) {
      return new Response(
        JSON.stringify({ error: "Archivo o ID faltante" }),
        { status: 400 }
      );
    }

    // Convertir archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir PDF como RAW
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "curriculums",
          public_id: `${id}_cv`,
          format: "pdf",
          type: "upload",  
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    // Buscar usuario
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    // URL de visualización normal
    const viewUrl = uploadResult.secure_url;

    // URL de descarga con nombre personalizado
    const safeName = (usuario.nombre || "usuario").replace(/\s+/g, "-");
    const downloadUrl = viewUrl.replace(
      "/upload/",
      `/upload/fl_attachment:CV-${safeName}/`
    );

    // Guardar ambas en Mongo
    usuario.pdfCurriculum = viewUrl;
    usuario.pdfCurriculumDownload = downloadUrl;
    await usuario.save();

    return new Response(
      JSON.stringify({
        message: "Currículum actualizado",
        pdfCurriculum: viewUrl,
        pdfCurriculumDownload: downloadUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/usuario/curriculum:", error);
    return new Response(
      JSON.stringify({ error: "Error al subir curriculum" }),
      { status: 500 }
    );
  }
}
