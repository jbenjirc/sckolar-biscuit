import Link from "next/link";

export default function ContactoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Contacto</h1>
      <p className="text-lg text-gray-600 mb-8">
        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.{" "}
        <Link href="/contacto" className="text-blue-600 hover:underline">
          Contáctanos
        </Link>
      </p>
    </div>
  );
}
