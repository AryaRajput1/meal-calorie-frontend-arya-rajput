// components/Navbar.tsx
"use client";

import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  return (
    <nav className="w-full h-16 bg-black text-white flex items-center justify-between px-6">
      {/* Title / Logo */}
      <h1 className="text-xl font-bold tracking-wide">Meal Calorie Checker</h1>

      {/* Navigation Links */}
      {!user ? (
        <div className="flex gap-6 text-sm">
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link href="/register" className="hover:text-gray-300">
            Signup
          </Link>
        </div>
      ) : (
        <div className="flex gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <button onClick={logout} className="hover:text-gray-300">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
