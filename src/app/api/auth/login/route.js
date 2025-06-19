import { getClient } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Func POST

export async function POST(request) {
  let client;

  try {
    client = await getClient();

    const { email, password } = await request.json();

    // 1. VALIDACIÓN: Si los campos están vacíos
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email y contraseña son obligatorios." }),
        {
          status: 400, // 400 Bad Request
          headers: { "Content-type": "application/json" },
        }
      );
    }

    // 2. VALIDACIÓN: Cuenta
    const userResult = await client.query(
      "SELECT id, email, password_hash, rol_codigo, nombre, ap_pat, ap_mat, is_active FROM usuarios WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];
    // Si no se encontró usuario con ese email
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas." }),
        {
          status: 401, // 401 Unauthorized
          headers: { "Content-type": "application/json" },
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
          headers: { "Content-type": "application/json" },
        }
      );
    }

    // 3. VALIDACIÓN: Contraseña
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    // Contraseña incorrecta
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas." }),
        {
          status: 401, // 401 unauthorized
          headers: { "Conttent-type": "application/json" },
        }
      );
    }

    // --- GENERACIÓN DEL JWT ---

    const tokenPayload = {
      userId: user.id,
      userEmail: user.email,
      userRole: user.rol_codigo,
    };

    // Generación del token
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "0.5h" });

    // DATOS DE USUARIO
    const userData = {
      id: user.id,
      email: user.email,
      rol_codigo: user.rol_codigo,
      nombre: user.nombre,
      ap_pat: user.ap_pat,
      ap_mat: user.ap_mat,
    };

    const response = new Response(
      JSON.stringify({
        message: "Inicio de sesión exitoso :)",
        user: userData,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          //TOKEN CONFIG
          "Set-Cookie":
            `token=${token}; HttpOnly; Path=/; Max-Age=360; SameSite=Lax` +
            (process.env.NODE_ENV === "production" ? "; Secure" : ""),
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error en en login", error);
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor al intentar iniciar sesión.",
      }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}
