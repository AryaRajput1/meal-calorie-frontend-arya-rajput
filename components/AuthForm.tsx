"use client";

import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "@/lib/validations";
import { loginUser, registerUser } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { firstCapitalize } from "@/lib/firstCapitalize";
import { z } from "zod";
import { useState } from "react";
import { useRateLimit } from "@/hooks/useRateLimit";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isLoginMode = mode === "login";
  const schema = isLoginMode ? loginSchema : registerSchema;

  type FormData = z.infer<typeof loginSchema | typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const [apiError, setApiError] = useState<string | null>(null);

  const { retryAfter, rateLimitMessage, handleRateLimitError } = useRateLimit();

  const onSubmit = async (data: any) => {
    setApiError(null);

    try {
      const res = isLoginMode
        ? await loginUser(data)
        : await registerUser(data);

      setAuth(res);
      router.push("/dashboard");
    } catch (e: any) {
      if (!handleRateLimitError(e)) {
        setApiError(e.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center">
          {isLoginMode ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Register fields */}
        {!isLoginMode && (
          <div className="flex gap-2">
            <div className="w-1/2">
              <input
                placeholder="First Name"
                {...register("first_name")}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
              {(errors as any).first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {(errors as any).first_name.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <input
                placeholder="Last Name"
                {...register("last_name")}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
              {(errors as any).last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {(errors as any).last_name.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <input
            placeholder="Email"
            {...register("email")}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        {/* Global Error */}
        {(apiError || rateLimitMessage) && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg">
            {rateLimitMessage || apiError}
            {retryAfter !== null && (
              <div className="mt-1 font-medium">Retry in {retryAfter}s</div>
            )}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting || retryAfter !== null}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {retryAfter !== null
            ? `Wait ${retryAfter}s`
            : isSubmitting
              ? "Processing..."
              : firstCapitalize(mode)}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          {isLoginMode ? "New here?" : "Already have an account?"}{" "}
          <span className="text-black font-medium cursor-pointer">
            {isLoginMode ? (
              <Link href="/register">Register</Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </span>
        </p>
      </form>
    </div>
  );
}
