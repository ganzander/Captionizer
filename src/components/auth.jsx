import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";
import User from "../libs/models/user.model"
import connectToDatabase from "../libs/models/mongoose";


export const Auth = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks : {
    async signIn({user, account, profile, email, credentials}){
      if(account.provider == 'github'){

        // connect to database
        await connectToDatabase()

        // checking if user exist
        let currentUser = await User.findOne({email : email})
        //creating new user
        if(!currentUser){
          const newUser = await User.create({
            email : user.email,
            username : user.name,
            id : user.id
          })

          await newUser.save()
          // user.name = newUser.username
        }
        return true
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET ,

};
