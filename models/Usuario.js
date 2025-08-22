import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, unique: true },
  contraseña: String,
  tipoDocumento: String,
  numeroDocumento: String,
  telefono: String,
  rol: { type: String, default: "usuario" },
}, { timestamps: true });

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);
