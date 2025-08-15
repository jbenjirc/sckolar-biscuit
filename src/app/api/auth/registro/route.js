// school-biscuit/src/app/api/auth/registro/route.js

import { getClient } from "@/lib/db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET_ = process.env.JWT_SECRET;

// Función para validar email
function esEmailValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo).toLowerCase());
}

export async function POST(request) {
  let client_;

  try {
    // 1) Leer y validar payload
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
    }

    let { emailForm, passwordForm } = body;

    if (!emailForm || !passwordForm) {
      return NextResponse.json(
        { error: "Correo y contraseña obligatorios" },
        { status: 400 }
      );
    }

    // Normalizar email y contraseña
    const emailLowerCase = String(emailForm || "")
      .trim()
      .toLowerCase();
    const passwordNormalized = String(passwordForm || "").trim();

    // Validación de email
    if (!esEmailValido(emailLowerCase)) {
      return NextResponse.json(
        {
          error: "Correo electrónico inválido.",
        },
        { status: 400 }
      );
    }

    // Validación de contraseña...

    // 2) Conexión DB
    client_ = await getClient();

    // 3) Verificar duplicado de email
    const dup = await client_.query(
      "SELECT id FROM usuarios WHERE email = $1 LIMIT 1",
      [emailLowerCase]
    );
    if (dup.rowCount) {
      return NextResponse.json(
        {
          error: "Este correo ya está registrado.",
        },
        { status: 409 }
      );
    }

    // 4) Hashear contraseña
    const passwordHash = await bcryptjs.hash(passwordNormalized, 12);

    // 5) Insertar Usuario Aspirante
    const insert = await client_.query(
      `INSERT INTO usuarios (email, password_hash, emailalterno)
      VALUES ($1,$2, $1)
      RETURNING id, emailalterno, rol_codigo`,
      [emailLowerCase, passwordHash]
    );

    const user = insert.rows[0];

    // 6) Login y Cookie usando ASPIR
    const tokenPayload_ = {
      userId: user.id,
      userEmail: user.email,
      userEmailAlterno: user.emailAlterno,
      userRole: user.rol_codigo,
    };

    if (JWT_SECRET_) {
      const generatedToken_ = jwt.sign(tokenPayload_, JWT_SECRET_, {
        expiresIn: "1min",
      });

      cookies().set("token", generatedToken_, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60, // 1 minuto
      });
    }

    // 7) Respuesta exitosa
    return NextResponse.json(
      { ok: true, message: "Cuenta creada :)", user },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === "23505") {
      return NextResponse.json(
        { error: "Correo ya registrado." },
        { status: 409 }
      );
    }
    console.log("Error en registro:", error);

    return NextResponse.json(
      { error: "Error en el registro." },
      { status: 500 }
    );
  } finally {
    try {
      client_?.release?.();
    } catch {}
  }
}
