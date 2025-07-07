// GET
export async function POST() {
  try {
    const response_ = new Response(
      JSON.stringify({ message: " Sesión cerrada exitosamente." }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie":
            `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax` +
            (process.env.NODE_ENV === "production" ? "; Secure" : ""),
        },
      }
    );

    return response_;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor al intentar cerrar sesión.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  return POST();
}
