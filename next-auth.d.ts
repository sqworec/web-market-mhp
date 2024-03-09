import {UserRole} from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    organization: string
    payerAndAddress: string
    bankAccountNumber: string
    role: UserRole
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}
