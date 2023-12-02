import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    const { userId, isPublicRoute, orgId } = auth;
    const { pathname } = req.nextUrl;

    if (userId && isPublicRoute) {
      const path = orgId ? `organization/${orgId}` : "/select-org";
      const orgSelection = new URL(path, req.url);

      return NextResponse.redirect(orgSelection);
    }

    if (!userId && !isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (userId && !orgId && pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);

      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
