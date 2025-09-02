import mongoose from "mongoose";

const PostulacionSchema = new mongoose.Schema(
  {
    ofertaId: { type: mongoose.Schema.Types.ObjectId, ref: "Oferta", required: true },
    nombre: String,
    correo: String,
    documento: String,
    especialidad: String,
    pdfCurriculum: String,
    foto: { type: String, default: "/default-avatar.png" },
  },
  { timestamps: true }
);

export default mongoose.models.Postulacion || mongoose.model("Postulacion", PostulacionSchema);
