"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { registerSchema, type registerInput } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ConditionalAuthFooter from "@/components/ui/conditional-auth-footer";

import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div>
      {/* Register form using email/password */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full ">
          <div>
            <FieldLabel
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 m-1"
            >
              Name
            </FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Spiderman"
              className="w-full mb-1"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 text-right">
                {errors.name.message}
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full mb-1"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none hover:cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full mb-1"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none hover:cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
          <ConditionalAuthFooter />
        </div>
      </form>
    </div>
  );
}
