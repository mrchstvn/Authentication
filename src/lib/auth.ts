import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
// import * as schema from "@/db/schema"; // your drizzle schema

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    // schema: schema,
  }),

  emailAndPassword: {
    enabled: true,
    // Optional: Customize the email and password validation rules
    requiredEmailVerification: false, // Set to true if you want to require email verification
  },
});
