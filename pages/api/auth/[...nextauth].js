import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google";
import RedditProvider from "next-auth/providers/reddit";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // }),
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET
    }),
  ],
}
export default NextAuth(authOptions)