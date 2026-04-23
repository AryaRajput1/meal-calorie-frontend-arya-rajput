"use client";

import { useState } from "react";

export default function MealHistoryTable({ history }: { history: any[] }) {
  const [openRow, setOpenRow] = useState<number | null>(null);

  if (!history || history.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No meals searched yet 🍽️
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {/* Header */}
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-medium">Dish</th>
            <th className="p-3 font-medium">Calories</th>
            <th className="p-3 font-medium">Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {history.map((item, index) => {
            const isOpen = openRow === index;

            return (
              <>
                {/* Main Row */}
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{item.dish_name}</td>
                  <td className="p-3 text-gray-600">
                    {item.total_calories}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        setOpenRow(isOpen ? null : index)
                      }
                      className="text-black underline text-xs"
                    >
                      {isOpen ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {/* Expand Row */}
                {isOpen && (
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="p-3">
                      <div className="grid grid-cols-2 gap-3 text-xs text-center">
                        <div className="bg-white p-2 rounded">
                          Protein: {item.total_macronutrients?.protein ?? "-"}g
                        </div>
                        <div className="bg-white p-2 rounded">
                          Fat: {item.total_macronutrients?.total_fat ?? "-"}g
                        </div>
                        <div className="bg-white p-2 rounded">
                          Carbs: {item.total_macronutrients?.carbohydrates ?? "-"}g
                        </div>
                        <div className="bg-white p-2 rounded">
                          Sugar: {item.total_macronutrients?.sugars ?? "-"}g
                        </div>
                        <div className="bg-white p-2 rounded col-span-2">
                          Fiber: {item.total_macronutrients?.fiber ?? "-"}g
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}