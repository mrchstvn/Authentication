// import { createAuthClient } from "better-auth/react";
// import * as dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

// export const authClient = createAuthClient({
//     baseUrl: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
// })

// export const { signIn, signUp, signOut, useSession } = authClient;

// ============================================================================
// THIS FILE = THE "REMOTE CONTROL" USED BY THE BROWSER (runs on the CLIENT)
// ============================================================================
// lib/auth.ts (the "brain") runs on the server and NEVER gets sent to the
// browser — it touches the database directly, which must stay private.
//
// This file is the opposite: it's a small, safe helper that our React
// components (login form, register form, logout button) import so they can
// send requests like "please log this person in" to our server.
// Think of lib/auth.ts as the restaurant kitchen, and this file as the menu
// the customer (browser) uses to place an order.
// ============================================================================

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // This tells the client WHERE to send its requests. It should match
  // whatever URL your app is running on.

  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
console.log("authClient baseURL:", process.env.NEXT_PUBLIC_BETTER_AUTH_URL);

// We pull out the specific functions we'll actually use in our components,
// just so the import lines in our pages look a little cleaner.
export const { signIn, signUp, signOut, useSession } = authClient;
