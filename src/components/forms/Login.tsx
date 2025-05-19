"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpVerification from "./Otp";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // fake login API call
      const fakeToken = "fake_jwt_token";
      Cookies.set("token", fakeToken);
      setShowOtp(true);
    } catch (err) {
      console.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (showOtp) return <OtpVerification />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Login</h2>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
