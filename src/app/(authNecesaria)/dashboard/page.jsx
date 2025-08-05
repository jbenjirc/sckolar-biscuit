// sckolar-biscuit-nextjs/src/app/(authNecesaria)/dashboard/page.jsx
// server-side code for dashboard page

import { redirect } from "next/navigation";
import { useAuth_ } from "@/contexts/AuthContext";

export default async function Page() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-700">
          This is your dashboard where you can manage your content.
        </p>
      </main>
    </div>
  );
}
