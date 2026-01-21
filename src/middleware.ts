import { createMiddleware } from "@convex-dev/better-auth/middleware";
import { convex } from "@/lib/convex";

export const { authMiddleware } = createMiddleware({
  convex,
});

export default authMiddleware;

export const config = {
  matcher: ["/dashboard/:path*", "/api/auth/:path*"],
};
