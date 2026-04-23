"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import MealForm from "@/components/MealForm";
import ResultCard from "@/components/ResultCard";

export default function Calories() {
  useAuthGuard();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Calories Calculator 🍽️</h1>
          <p className="text-gray-500 mt-1">
            Search any meal and get instant nutrition insights
          </p>
        </div>

        {/* Form */}
        <MealForm />

        {/* Result */}
        <ResultCard />
      </div>
    </div>
  );
}