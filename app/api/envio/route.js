import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { empresa, nit, telefono, plan } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER, // tu correo Gmail
        pass: process.env.EMAIL_PASS, // tu App Password de 16 dígitos
      },
    });

    await transporter.sendMail({
      from: `"Pleshmark" <${process.env.EMAIL_USER}>`,
      to: "2024.29.aragon.gka@gmail.com", // fijo o dinámico si quieres
      subject: `Nueva solicitud - ${plan}`,
      html: `
        <h2>Solicitud de Plan</h2>
        <p><b>Empresa:</b> ${empresa}</p>
        <p><b>NIT:</b> ${nit}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Plan:</b> ${plan}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "✅ Correo enviado" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error enviando correo:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "❌ Error enviando correo",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
