import NextAuth, { NextAuthOptions } from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions= {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:'jwt'
    },
    
    pages:{
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
          
          name: "Credentials",
          
          credentials: {
            email: { label: "Email", type: "text", placeholder: "johnsmith@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                return null;
            }
           
            const exitingUser  =  await db.user.findUnique(
                {
                    where : {email: credentials.email}
                }
            );
            if(!exitingUser){
                return null;
            }
            const passwordMath = await compare(credentials.password, exitingUser.password)
            if(!passwordMath){
              return null;
            }
            return {
                id:`${exitingUser.id}`,
                name:exitingUser.name,
                email:exitingUser.email
            }
          }
        })
      ],
      callbacks:{
        async jwt({token,user}) {
            if (user) {
              return {
                ...token,
                name : user.name
              }
            }
            return token
          },
          async session({ session, token }) {
            console.log('session returned')
            return {
                
                ...session,
                user:{
                    ...session.user,
                    name : token.name
                }
            }
           
          }

      }
      
}