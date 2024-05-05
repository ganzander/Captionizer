import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import User from "../libs/models/user.model";
import connectToDatabase from "../libs/models/mongoose";

export const Auth = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider == "github" || account.provider == "google") {
          await connectToDatabase();
          let duplicateUser = await User.findOne({ email: user.email });
          if (duplicateUser === null) {
            const newUser = new User({
              email: user.email,
              username: user.name,
            });

            await User.create(newUser);
            console.log("Saved");
          }
        }
      } catch (err) {
        console.log(JSON.stringify(err));
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
