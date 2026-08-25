import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

declare module "next-auth" {
	interface Session {
		accessToken: string
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		})
	],
	callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
})