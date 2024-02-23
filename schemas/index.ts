import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Введите почту"
    }),
    password: z.string().min(1, {
        message: "Введите пароль"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Введите почту"
    }),
    password: z.string().min(6, {
        message: "Пароль должен содержать как минимум 6 символов"
    }),
    name: z.string().min(1, {
        message: "Введите ваше полное имя"
    }),
})