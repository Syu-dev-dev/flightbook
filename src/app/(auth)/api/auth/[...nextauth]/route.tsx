import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Initialize NextAuth handler with auth options
const handler = NextAuth(authOptions);

// Export handler specifically for GET and POST requests
export const GET = handler;
export const POST = handler;

// import NextAuth from "next-auth"
// // import GithubProvider from "next-auth/providers/github"
// import {authOptions} from "@/lib/auth"

// export const handler = NextAuth(authOptions)

// export {handler as GET, handler as POST, } 
