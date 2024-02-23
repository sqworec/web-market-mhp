"use server"

import * as z from "zod"
import bcrypt from "bcrypt"

import {RegisterSchema} from "@/schemas";
import {db} from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Неверные значения"}
    }

    const {email, password, name} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await  db.user.findUnique({
        where: {
            email,
        }
    })

    if(existingUser) {
        return {error: "Пользователь с такой почтой уже существует"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    return {success: "Регистрация успешна!"}
}