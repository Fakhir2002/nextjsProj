// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      authorize: async (credentials) => {
        await connectDB(); // Ensure DB connection

        const user = await User.findOne({ email: credentials.email });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return user; // Authentication successful
        }

        throw new Error("Invalid email or password"); // Authentication failed
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
