import { auth } from "@/lib/auth"; // our configured "brain"
import { toNextJsHandler } from "better-auth/next-js";

// The folder name [...all] means: catch ANY url starting with
// /api/auth/, no matter what comes after it. So /api/auth/sign-up,
// /api/auth/sign-in, /api/auth/sign-out all land in this ONE file.

// toNextJsHandler converts our auth config into the two functions
// Next.js expects a route file to export: GET and POST.
export const { GET, POST } = toNextJsHandler(auth);
