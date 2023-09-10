// import NextAuth from "next-auth/next";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";
const { compare } = require("bcrypt");

export const authOptions : AuthOptions = {
    providers : [
        Credentials({
            id : "credentials",
            name : "Credentials",
            credentials : {
                email : {
                    label : "Email",
                    type : "text",
                },
                password : {
                    label : "Password",
                    type : "password",
                }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required")
                }
                const user = await prismadb.user.findUnique({
                    where : {
                        email : credentials.email
                    }
                })
                if (!user || !user.hashedPassword) {
                    throw new Error("Email does not exist")
                }
                const isPasswordCorrect = await compare(credentials.password, user.hashedPassword)
                if (!isPasswordCorrect) {
                    throw new Error("Incorrect password")
                }
                console.log(user)
                return user
            }
        })
    ],
    pages : {
        signIn : "/Auth"
    },
    debug : process.env.NODE_ENV === "development",
    adapter : PrismaAdapter(prismadb),
    session : {
        strategy : "jwt"
    },
    jwt : {
        secret : process.env.NEXTAUTH_JWT_SECRET
    },
    secret : process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
