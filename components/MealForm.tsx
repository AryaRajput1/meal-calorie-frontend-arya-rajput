"use client";

import { useForm } from "react-hook-form";
import { mealSchema } from "@/lib/validations";
import { getCalories } from "@/lib/api";
import { useMealStore } from "@/stores/mealStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRateLimit } from "@/hooks/useRateLimit";

export default function MealForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(mealSchema),
  });

  const setResult = useMealStore((s: any) => s.setResult);
  const [apiError, setApiError] = useState<string | null>(null);
  const { retryAfter, rateLimitMessage, handleRateLimitError } = useRateLimit();

  const onSubmit = async (data: any) => {
    setApiError(null);
    try {
      const res = await getCalories(data);
      setResult(res);
    } catch (e: any) {
      if (!handleRateLimitError(e)) {
        setApiError(e.message || "Something went wrong");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">Search Meal</h2>

      {/* Dish */}
      <div>
        <input
          placeholder="e.g. Paneer Butter Masala"
          {...register("dish_name")}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
        />
        {errors.dish_name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.dish_name.message as string}
          </p>
        )}
      </div>

      {/* Servings */}
      <div>
        <input
          type="number"
          step="0.1"
          placeholder="Servings (e.g. 1.5)"
          {...register("servings", { valueAsNumber: true })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
        />
        {errors.servings && (
          <p className="text-red-500 text-xs mt-1">
            {errors.servings.message as string}
          </p>
        )}
      </div>

      {/* API Error */}
      {(apiError || rateLimitMessage) && (
        <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg">
          {rateLimitMessage || apiError}
          {retryAfter !== null && (
            <div className="mt-1 font-medium">Retry in {retryAfter}s</div>
          )}
        </div>
      )}

      <button
        disabled={isSubmitting || retryAfter !== null}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
      >
        {isSubmitting ? "Calculating..." : "Get Calories"}
      </button>
    </form>
  );
}
