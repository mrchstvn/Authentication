"use client";

import { usePathname } from "next/navigation";

export default function ConditionalAuthHeader() {
  const pathname = usePathname();
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">
        {pathname === "/register"
          ? "Create an account"
          : "Sign in to your account"}
      </h2>
    </div>
  );
}
