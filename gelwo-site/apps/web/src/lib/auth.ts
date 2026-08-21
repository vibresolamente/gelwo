import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * authOptions is defined in a shared lib file (lib/auth.ts) and imported here.
 * The route file only exports HTTP handlers GET and POST.
 * This fixes the Next.js 13 App Router constraint that route files
 * must not export non-HTTP-handler named exports.
 */
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "GELWO Portal",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "client@institution.go.ke" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
          const res = await fetch(`${apiUrl}/api/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });

          const response = await res.json();

          if (res.ok && response.success && response.data) {
            return {
              id: response.data.user.id,
              name: `${response.data.user.firstName || ''} ${response.data.user.lastName || ''}`.trim(),
              email: response.data.user.email,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
              roles: response.data.user.roles
            };
          }
          return null;
        } catch (e) {
          console.error("Auth error:", e);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.roles = (user as any).roles;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session.user as any).roles = token.roles;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/',
  }
};

const handler = NextAuth(authOptions);

export default authOptions;
