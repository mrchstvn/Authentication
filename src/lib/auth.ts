import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Redis } from "@upstash/redis";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // your drizzle schema

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: schema,
  }),

  emailAndPassword: {
    enabled: true,
    // Optional: Customize the email and password validation rules
    requiredEmailVerification: false, // Set to true if you want to require email verification
  },

  secondaryStorage: {
    get: async (key) => await redis.get(key),
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { ex: ttl });
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },

  rateLimiter: {
    enabled: true,
    storage: "secondary-storage",
    window: 60 * 1000, // 1 minute,
    max: 5, // Maximum of 5 requests per window
    custorRules: {
      "/signin/email": { window: 60 * 1000, max: 5 }, // 5 requests per minute for email sign-in
      "/signup/email": { window: 60 * 1000, max: 5 }, // 5 requests per minute for email sign-up
    },
  },
});
