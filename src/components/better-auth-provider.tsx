"use client";

import { betterAuthClient } from "convex-dev-better-auth/client";
import { ConvexProviderWithBetterAuth } from "convex-dev-better-auth/react";
import { convex } from "@/lib/convex";

export const { signIn, signOut, useSession, useUser } = betterAuthClient({
  convex,
});

export function BetterAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithBetterAuth client={convex}>
      {children}
    </ConvexProviderWithBetterAuth>
  );
}
