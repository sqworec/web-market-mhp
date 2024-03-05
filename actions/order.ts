"use server"

import * as z from "zod"
import {LoginSchema, OrderSchema} from "@/schemas";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";

export const order = async (values: z.infer<typeof OrderSchema>) => {
    const validatedFields = OrderSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Неверные значения"}
    }

    const {organization, payerAndAddress, bankAccountNumber} = validatedFields.data

    try {
        await ordered("credentials", {
            organization,
            payerAndAddress,
            bankAccountNumber,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Неверные значения!"}
                default:
                    return {error: "Упс! Что-то пошло не так!"}
            }
        }

        throw error
    }
}