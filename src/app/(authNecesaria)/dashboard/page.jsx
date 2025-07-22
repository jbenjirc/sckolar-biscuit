// sckolar-biscuit-nextjs/src/app/(authNecesaria)/dashboard/page.jsx
// server-side code for dashboard page

import { redirect } from "next/navigation";
import { useAuth_ } from "@/contexts/AuthContext";

export default async function Page() {
  return (
    <div className="flex h-screen">
      <aside1 className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <Link
              href="/dashboard/alumnos"
              className="text-gray-300 hover:text-white     "
            >
              Alumnos
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/teachers"
              className="text-gray-300 hover:text-white     "
            >
              Teachers
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/courses"
              className="text-gray-300 hover:text-white     "
            >
              Courses
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/settings"
              className="text-gray-300 hover:text-white     "
            >
              Settings
            </Link>
          </li>
        </ul>
      </aside1>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-700">
          This is your dashboard where you can manage your content.
        </p>
      </main>
    </div>
  );
}
