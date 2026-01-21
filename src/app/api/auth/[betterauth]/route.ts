import { convexAction } from "@convex-dev/better-auth/server";
import { betterAuth } from "convex-dev-better-auth";
import { api } from "@/convex/_generated/api";

export const { POST } = convexAction(
  betterAuth({
    issuer: process.env.CONVEX_SITE_URL || "http://localhost:3000",
  }),
  api
);
