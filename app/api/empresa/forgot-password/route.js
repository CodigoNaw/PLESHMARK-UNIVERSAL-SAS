// app/api/empresa/forgot-password/route.js
export const runtime = "nodejs";

import dbConnect from "@/lib/mongodb";
import Empresa from "@/models/Empresa";
import Administrador from "@/models/Administrador";
import Usuario from "@/models/Usuario";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await dbConnect();
    const { correo } = await req.json();

    if (!correo) {
      return new Response(JSON.stringify({ error: "El correo es obligatorio" }), { status: 400 });
    }

    // 1) Buscar el correo en cualquiera de las colecciones (para no duplicar lógica)
    const [empresa, admin, usuario] = await Promise.all([
      Empresa.findOne({ correo }),
      Administrador.findOne({ correo }),
      Usuario.findOne({ correo }),
    ]);
    const user = empresa || admin || usuario;

    // 2) Por seguridad, no revelamos si existe o no: siempre respondemos 200
    if (user) {
      const token = jwt.sign(
        { id: user._id, rol: empresa ? "empresa" : admin ? "administrador" : "usuario" },
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // token válido por 15 minutos
      );

      const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      // Para el flujo de empresa usamos esta ruta del frontend:
      const resetUrl = `${origin}/empresa-reset?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // companypleshmark@gmail.com
          pass: process.env.EMAIL_PASS, // tu App Password de 16 caracteres
        },
      });

await transporter.sendMail({
  from: `"PLESHMARK COMPANY" <${process.env.EMAIL_USER}>`,
  to: correo,
  subject: "🔐 Recuperación de contraseña - PLESHMARK",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background-color: #f9fafb;">
      <h2 style="color: #111827; text-align: center;">Recuperación de contraseña</h2>
      
      <p>Hola,</p>
      <p>Hemos recibido una solicitud para restablecer tu contraseña en <strong>PLESHMARK</strong>. 
      Por favor, sigue el enlace a continuación para crear una nueva contraseña. 
      <span style="color: #b91c1c; font-weight: bold;">Este enlace es válido por solo 15 minutos.</span></p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" target="_blank" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
          Restablecer contraseña
        </a>
      </div>
      
      <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
      <p style="word-break: break-all; color: #2563eb;">
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      </p>
      
      <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
        Si no realizaste esta solicitud, puedes ignorar este mensaje de manera segura. 
        Tu contraseña actual seguirá funcionando.
      </p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="text-align: center; font-size: 12px; color: #9ca3af;">
        © ${new Date().getFullYear()} PLESHMARK COMPANY. Todos los derechos reservados.
      </p>
    </div>
  `,
});

    }

    return new Response(
      JSON.stringify({ mensaje: "Si el correo existe, enviamos un enlace de recuperación." }),
      { status: 200 }
    );
  } catch (e) {
    console.error("Error en /empresa/forgot-password:", e);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
}
