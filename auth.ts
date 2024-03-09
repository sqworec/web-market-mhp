import NextAuth from "next-auth";
import {UserRole} from "@prisma/client";
import authConfig from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import {getUserById} from "@/lib/services/user-service";


export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            if (token.organization && session.user) {
                session.user.organization = token.organization as string
            }

            if (token.payerAndAddress && session.user) {
                session.user.payerAndAddress = token.payerAndAddress as string
            }

            if (token.bankAccountNumber && session.user) {
                session.user.bankAccountNumber = token.bankAccountNumber as string
            }

            return session
        },
        async jwt({token}) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.role = existingUser.role
            token.organization = existingUser.organization
            token.payerAndAddress = existingUser.payerAndAddress
            token.bankAccountNumber = existingUser.bankAccountNumber

            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
})