// school-biscuit/src/app/api/auth/registro/route.js

import { getClient } from "@/lib/db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
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

    let { emailForm, passwordForm } = body;
    emailLowerCase = String(emailForm || "")
      .trim()
      .toLowerCase();
    password = String(passwordForm || "");

    if (!emailLowerCase || !password) {
      return new Response(
        JSON.stringify({ error: "Correo y contraseña son obligatorios." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!esEmailValido(emailLowerCase)) {
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
      [emailLowerCase]
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
      [emailLowerCase, passwordHash]
    );

    const user = insert.rows[0];

    // 6) Login y Cookie usando ASPIR
    const tokenPayload_ = {
      userId: user.id,
      userEmail: user.email,
      userRole: user.rol_codigo,
    };

    if (JWT_SECRET_) {
      const generatedToken_ = jwt.sign(tokenPayload_, JWT_SECRET_, {
        expiresIn: "1h",
      });

      cookies().set("token", generatedToken_, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hora,
      });
    }

    // 7) Respuesta exitosa
    return new Response(
      JSON.stringify({
        ok: true,
        message: "Cuenta creada y sesión iniciada.",
        user,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    if (error?.code === "23505") {
      return new Response(JSON.stringify({ error: "Correo ya registrado." }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("Error en registro - código 23505:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidror." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    try {
      client_?.release?.();
    } catch {}
  }
}
