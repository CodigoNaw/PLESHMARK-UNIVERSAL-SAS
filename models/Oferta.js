import mongoose from "mongoose";

const OfertaSchema = new mongoose.Schema(
  {
    cargo: { type: String, required: true },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true },
    salario: { type: Number, required: true },
    direccion: { type: String },
    descripcion: { type: String },
    estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
    telefono: { type: String },
    tipoContrato: { 
      type: String, 
      enum: ["obra labor", "prestacion de servicio", "indefinido", "temporal"], 
      default: "indefinido" 
    },
  },
  { timestamps: true }
);

export default mongoose.models.Oferta || mongoose.model("Oferta", OfertaSchema);
