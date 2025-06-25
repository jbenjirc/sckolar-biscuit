import { getClient } from "@/lib/db";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Joan } from "next/font/google";
import cookies from "next/headers";

const JWT_SECRET_ = process.env.JWT_SECRET || "fallback_secret_for_dev_only";

export async function GET() {
  let client_;

  try {
    const cookieStore_ = cookies();
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

      const expiredResponse_ = new Response(
        JSON.stringify({
          isAuthenticated: false,
          message: "Sesión expirada o inválida.",
        }),
        { status: 401 }
      );
      expiredResponse_.headers.set(
        "Set-Cookie",
        `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
      );
      return expiredResponse_;
    }

    // Obtener más datos del usuario
    client_ = await getClient();
    const userDbResult_ = await client_.query(
      "SELECT nombre, ap_pat, ap_mat FROM usuarios WHERE id = $1;",
      [decodedToken_.userId]
    );
    const userFromDb_ = userDbResult_.rows[0];
    if (userFromDb_) {
      return new Response(
        JSON.stringify({
          isAuthenticated: true,
          user: { ...decodedToken_, ...userFromDb_ },
        }),
        { status: 200 }
      );
    }

    const userData_ = {
      id: decodedToken_.userId,
      email: decodedToken_.email,
      rol_codigo: decodedToken_.userRole,
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
