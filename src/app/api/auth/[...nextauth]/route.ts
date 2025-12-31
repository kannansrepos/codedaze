import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "codedaze.tech@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yy = String(now.getFullYear()).slice(-2);
        const expectedUsername = "codedaze.tech@gmail.com";
        const expectedPassword = `Ka${dd}nn${mm}an${yy}`;

        if (credentials?.username === expectedUsername && credentials?.password === expectedPassword) {
          return { id: "1", name: "CodeDaze", email: expectedUsername };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/adminlogin',
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-this-in-production",
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
