"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./button";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";

export default function SocialLoginButtons() {
  async function handleSocialLogin(provider: "google" | "github") {
    await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    });
  }
  return (
    <div>
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => handleSocialLogin("google")}
      >
        <SiGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => handleSocialLogin("github")}
      >
        <SiGithub className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  );
}
