"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ConditionalAuthHeader() {
  const pathname = usePathname();
  return (
    <div>
      {pathname === "/register" ? (
        <p className="text-sm text-black/50 mt-5 text-right ">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Sign in
          </Link>{" "}
        </p>
      ) : (
        <p className="text-sm text-black/50 mt-5 text-right ">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-blue-500 underline">
            Sign up
          </Link>{" "}
        </p>
      )}
    </div>
  );
}
