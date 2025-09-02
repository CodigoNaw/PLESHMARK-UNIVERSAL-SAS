import dbConnect from "@/lib/mongodb";
import Usuario from "@/models/Usuario";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 9;
    const search = searchParams.get("search") || "";

    const query = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { nombre: regex },
        { correo: regex },
        { especialidad: regex }
      ];

      if (search.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or.push({ _id: new mongoose.Types.ObjectId(search) });
      }
    }

    const usuario = await Usuario.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Usuario.countDocuments(query);

    return new Response(JSON.stringify({ usuario, total }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
