// skolar-biscuit-nextjs/src/app/api/auth/session/route.js
import { getClient } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET_ = process.env.JWT_SECRET || "fallback_secret_for_dev_only";

export async function GET() {
  let client_;

  try {
    const cookieStore_ = await cookies();
    const token_ = cookieStore_.get("token")?.value;

    if (!token_) {
      return new Response(JSON.stringify({ isAuthenticated: false }), {
        status: 200,
      });
    }

    let decodedToken_;

    try {
      decodedToken_ = jwt.verify(token_, JWT_SECRET_);
    } catch (jwtError) {
      console.error("Token JWT inválido o expirado:", jwtError.message);

      // Se le pide al navegador que elimine la cookie del token
      const expiredResponse_ = new Response(
        JSON.stringify({
          isAuthenticated: false,
          message: "Sesión expirada o inválida.",
        }),
        { status: 401 }
      );
      expiredResponse_.headers.set(
        "Set-Cookie",
        `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax` +
          (process.env.NODE_ENV === "production" ? "; Secure" : "")
      );
      return expiredResponse_;
    }

    // Obtener datos del usuario
    client_ = await getClient();
    const userDbResult_ = await client_.query(
      "SELECT id, email, nombre, ap_pat, ap_mat, rol_codigo, is_active FROM usuarios WHERE id = $1;",
      [decodedToken_.userId]
    );
    const userFromDb_ = userDbResult_.rows[0];

    if (!userFromDb_ || !userFromDb_.is_active) {
      const inactiveUserResponse_ = new Response(
        JSON.stringify({
          isAuthenticated: false,
          message: "Usuario no encontrado o inactivo.",
        }),
        { status: 401 }
      );

      inactiveUserResponse_.headers.set(
        "Set-Cookie",
        `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax` +
          (process.env.NODE_ENV === "production" ? "; Secure" : "")
      );

      return inactiveUserResponse_;
    }

    const userData_ = {
      id: userFromDb_.id,
      email: userFromDb_.email,
      nombre: userFromDb_.nombre,
      ap_pat: userFromDb_.ap_pat,
      ap_mat: userFromDb_.ap_mat,
      rol_codigo: userFromDb_.rol_codigo,
      is_active: userFromDb_.is_active,
    };

    // Devolver la info del usuario autenticado
    return new Response(
      JSON.stringify({ isAuthenticated: true, user: userData_ }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la verificación de sesión:", error);
    return new Response(
      JSON.stringify({
        isAuthenticated: false,
        error: "Error interno del servidor al verificar sesión.",
      }),
      { status: 500 }
    );
  } finally {
    if (client_) {
      client_.release();
    }
  }
}
