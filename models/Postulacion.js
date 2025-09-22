// models/Postulacion.js
import mongoose from "mongoose";

const PostulacionSchema = new mongoose.Schema(
  {
    oferta: { type: mongoose.Schema.Types.ObjectId, ref: "Oferta", required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    estado: { type: String, enum: ["pendiente", "aceptado", "rechazado"], default: "pendiente" }
  },
  { timestamps: true }
);

export default mongoose.models.Postulacion || mongoose.model("Postulacion", PostulacionSchema);
