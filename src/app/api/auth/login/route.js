import { getClient } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_ = process.env.JWT_SECRET;

// Func POST
export async function POST(request) {
  let client_;

  try {
    client_ = await getClient();

    const { email, password } = await request.json();

    // 1. VALIDACIÓN: Si los campos están vacíos
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email y contraseña son obligatorios." }),
        {
          status: 400, // 400 Bad Request
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2. VALIDACIÓN: Cuenta
    const userResult = await client_.query(
      "SELECT id, email, password_hash, nombre, ap_pat, ap_mat, rol_codigo, is_active, fecha_registro FROM usuarios WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];
    // Si no se encontró usuario con ese email
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas." }),
        {
          status: 401, // 401 Unauthorized
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // Si la cuenta no está activa
    if (!user.is_active) {
      return new Response(
        JSON.stringify({
          error: "Tu cuenta no está activa. Contacta al administrador.",
        }),
        {
          status: 403, // 403 Forbidden
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3. VALIDACIÓN: Contraseña
    const passwordMatch_ = await bcrypt.compare(password, user.password_hash);
    // Contraseña incorrecta
    if (!passwordMatch_) {
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas." }),
        {
          status: 401, // 401 unauthorized
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // --- DEFINICIÓN DE DURACIONES DE SESIÓN POR ROL ---
    let expiresInValue_;
    let maxAgeSecondsValue_;

    switch (user.rol_codigo) {
      case "ADMIN":
        expiresInValue_ = "0.05h";
        maxAgeSecondsValue_ = 180; // (2 * 60 * 60) + 60 seg
        break;
      case "DOCEN":
        expiresInValue_ = "1.5h";
        maxAgeSecondsValue_ = 5400; // (1.5 * 60 * 60) + 60 seg
        break;
      case "ALUMN":
        expiresInValue_ = "1h";
        maxAgeSecondsValue_ = 3600; // (1 * 60 * 60) + 60 seg
        break;
      case "TUTOR":
        expiresInValue_ = "1h";
        maxAgeSecondsValue_ = 3600; // (1 * 60 * 60) + 60 seg
        break;
      case "ASPIR":
        expiresInValue_ = "30m";
        maxAgeSecondsValue_ = 1800; // (0.5 * 60 * 60) + 60 seg
        break;
      default: // Rol por defecto o desconocido
        expiresInValue_ = "30m";
        maxAgeSecondsValue_ = 1800;
        break;
    }

    // --- GENERACIÓN DEL JWT ---
    const tokenPayload_ = {
      userId: user.id,
      userEmail: user.email,
      userRole: user.rol_codigo,
    };

    // Generación del token
    const generatedToken_ = jwt.sign(tokenPayload_, JWT_SECRET_, {
      expiresIn: expiresInValue_, // Duración dinámica por roles
    });

    // DATOS DE USUARIO
    const userData_ = {
      id: user.id,
      email: user.email,
      //password_hash: user.password_hash,
      nombre: user.nombre,
      ap_pat: user.ap_pat,
      ap_mat: user.ap_mat,
      rol_codigo: user.rol_codigo,
      is_active: user.is_active,
    };

    const response_ = new Response(
      JSON.stringify({
        message: "Inicio de sesión exitoso :)",
        user: userData_,
      }),
      {
        status: 200, // OK
        headers: {
          "Content-Type": "application/json",
          //TOKEN CONFIG
          "Set-Cookie":
            `token=${generatedToken_}; HttpOnly; Path=/; Max-Age=${maxAgeSecondsValue_}; SameSite=Lax` +
            (process.env.NODE_ENV === "production" ? "; Secure" : ""),
        },
      }
    );

    return response_;
  } catch (error) {
    console.error("Error en en login:", error);
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor al intentar iniciar sesión.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    if (client_) {
      client_.release();
    }
  }
}
