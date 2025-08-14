// school-biscuit/src/app/api/auth/registro/route.js

import { getClient } from "@/lib/db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET_ = process.env.JWT_SECRET;

function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export async function POST(request) {
  let client_;

  try {
    // 1) Leer y validar payload
    const body = await request.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ error: "JSON inválido." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let { email, password } = body;
    email = String(email || "")
      .trim()
      .toLowerCase();
    password = String(password || "");

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Correo y contraseña son obligatorios." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!esEmailValido(email)) {
      return NextResponse.json({
        error: "Correo electrónico inválido.",
        status: 400,
      });
    }

    // Validación de contraseña...

    // 2) Conexión DB
    client_ = await getClient();

    // 3) Verificar duplicado de email
    const dup = await client_.query(
      "SELECT id FORM punlic.usuarios WHERE email = $1 LIMIT 1",
      [email]
    );
    if (dup.rowCount) {
      return NextResponse.json({
        error: "Este correo ya está registrado.",
        status: 409,
      });
    }

    // 4) Hashear contraseña
    const passwordHash = await bcryptjs.hash(password, 12);

    // 5) Insertar Usuario Aspirante
    const insert = await client_.query(
      `INSERT INTO public.usuarios (email, password_hash)
      VALUES ($1,$2)
      RETURNING id, email, rol_codigo`,
      [email, passwordHash]
    );
  } catch (error) {
  } finally {
  }
}
