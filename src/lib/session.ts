import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getCurrentUser() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function isLoggedIn() {
  const session = await getCurrentUser();
  return session !== null;
}
