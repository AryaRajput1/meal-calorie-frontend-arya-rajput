"use client";

import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "@/lib/validations";
import { loginUser, registerUser } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { firstCapitalize } from "@/lib/firstCapitalize";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const schema = mode === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res =
        mode === "login" ? await loginUser(data) : await registerUser(data);

      setAuth(res);
      router.push("/dashboard");
    } catch (e: any) {
      alert(e.message);
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
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Register fields */}
        {mode === "register" && (
          <div className="flex gap-2">
            <div className="w-1/2">
              <input
                placeholder="First Name"
                {...register("first_name")}
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.first_name.message as string}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <input
                placeholder="Last Name"
                {...register("last_name")}
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name.message as string}
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
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : firstCapitalize(mode)}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <span className="text-black font-medium cursor-pointer">
            {mode === "login" ? (
              <Link href={"/register"}>Register </Link>
            ) : (
              <Link href={"/login"}>Login </Link>
            )}
          </span>
        </p>
      </form>
    </div>
  );
}
