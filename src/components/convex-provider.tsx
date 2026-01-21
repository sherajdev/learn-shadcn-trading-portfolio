"use client";

import { ReactNode } from "react";
import { ConvexProviderWithClient } from "convex/react-experimental";
import { ConvexReactClient } from "convex/react";
import { convex } from "@/lib/convex";

export function ConvexProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClient client={convex}>
      {children}
    </ConvexProviderWithClient>
  );
}
