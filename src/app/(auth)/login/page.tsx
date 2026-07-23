"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type loginInput } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ConditionalAuthFooter from "@/components/ui/conditional-auth-footer";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: loginInput) {
    setServerError("");

    const { error: SignInError } = await authClient.SignIn.email(data);

    if (SignInError) {
      setServerError(
        SignInError.message ?? "Invalid credentials. Please try again",
      );
      return;
    }

    router.push("/dashboard");
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full ">
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
          <ConditionalAuthFooter />
        </div>
      </form>
    </div>
  );
}
