import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth route handler — App Router compliant.
 * Only exports GET and POST handlers (no named exports of non-handlers).
 * authOptions lives in @/lib/auth to avoid the TS2344 constraint violation.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
