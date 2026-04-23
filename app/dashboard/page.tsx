"use client";

import MealHistoryTable from "@/components/MealHistoryTable";
import useAuthGuard from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/stores/authStore";
import { useMealStore } from "@/stores/mealStore";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  useAuthGuard();

  const user = useAuthStore((s) => s.user);
  const history = useMealStore((s: any) => s.history);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.first_name || "User"} 👋
          </h1>

          <button
            onClick={() => router.push("/calories")}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Check Calories
          </button>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Meals</h2>

          <MealHistoryTable history={history} />
        </div>
      </div>
    </div>
  );
}
