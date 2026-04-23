"use client";

import { useMealStore } from "@/stores/mealStore";

export default function ResultCard() {
  const { result, isLoading } = useMealStore((s: any) => s);

  // Loading State (Skeleton)
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-14 bg-gray-200 rounded"></div>
          <div className="h-14 bg-gray-200 rounded"></div>
          <div className="h-14 bg-gray-200 rounded"></div>
          <div className="h-14 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-500">
        🍽️ Enter a meal above to see nutrition details
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      
      {/* Title */}
      <h2 className="text-xl font-bold text-center">
        {result.dish_name}
      </h2>

      {/* Calories */}
      <div className="bg-black text-white text-center py-3 rounded-xl">
        <p className="text-sm opacity-80">Total Calories</p>
        <p className="text-2xl font-semibold">
          {result.total_calories}
        </p>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[
          { label: "Protein", value: result.total_macronutrients?.protein },
          { label: "Fat", value: result.total_macronutrients?.total_fat },
          { label: "Carbs", value: result.total_macronutrients?.carbohydrates },
          { label: "Sugar", value: result.total_macronutrients?.sugars },
          { label: "Fiber", value: result.total_macronutrients?.fiber },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gray-50 p-3 rounded-lg text-center"
          >
            <p className="text-gray-500">{item.label}</p>
            <p className="font-semibold">{item.value ?? "-"} g</p>
          </div>
        ))}
      </div>
    </div>
  );
}