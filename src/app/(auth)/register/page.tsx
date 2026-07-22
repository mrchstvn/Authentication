"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { registerSchema, type registerInput } from "@/lib/validations";
import { signUp } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: registerInput) {
    setServerError("");

    const { confirmPassword, ...signUpData } = data;

    const { error: signUpError } = await authClient.signUp.email(signUpData);
    if (signUpError) {
      setServerError(
        signUpError.message ?? "An error occurred during registration.",
      );
      return;
    }
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-5">
      <h2 className="text-4xl text-primary font-bold">Budgefy</h2>
      <p className="text-lg text-primary mb-2">Your personal expense tracker</p>
      <div className="min-w-sm rounded-md border border-gray-200 p-4 shadow-sm md:w-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Create an account
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Start tracking your expenses today!
        </p>

        {/* Oauth container */}
        <div className="flex flex-col gap-2">
          <Button className="w-full" size="lg" variant="outline">
            <SiGoogle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button className="w-full" size="lg" variant="outline">
            <SiGithub className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        {/* Divider line with "or" text */}
        <div className="flex flex-row items-center gap-4">
          <div className="w-full border-t border-gray-200" />
          <span className="text-gray-500">or</span>
          <div className="w-full border-t border-gray-200" />
        </div>

        {/* Register form using email/password */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full ">
            <div>
              <FieldLabel
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 m-1"
              >
                Username
              </FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Spiderman"
                className="w-full mb-1"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <FieldLabel
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 m-1"
              >
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="spiderman@example.com"
                className="w-full mb-1"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <FieldLabel
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 m-1"
              >
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full mb-1"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <FieldLabel
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 m-1"
              >
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Repeat password"
                className="w-full mb-1"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* show overall error */}
            {serverError && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4"
              size="lg"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
            <div>
              <p className="text-sm text-black/50 mt-5 text-right ">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 underline">
                  Sign in
                </Link>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
