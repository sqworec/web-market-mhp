"use client"

import * as React from "react"
import * as z from "zod"
import {RegisterSchema} from "@/schemas";
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormError} from "@/components/ui/form-error";
import {FormSuccess} from "@/components/ui/form-success";
import {useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import {register} from "@/actions/register";

export default function RegisterPage() {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    }
    return (
        <div className="flex justify-around mt-[5%]">
            <Card className="w-[550px] p-20 rounded-2xl border-none">
                <CardHeader>
                    <CardTitle>Добро пожаловать!</CardTitle>
                    <CardDescription>Создайте аккаунт</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="grid w-full items-center gap-4 mb-5">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Полное имя</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Ваше полное имя"
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Ваша почта"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Пароль</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Ваш пароль"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error}/>
                            <FormSuccess message={success}/>
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full mt-5"
                            >
                                Зарегистрироваться
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <p className="flex justify-around text-sm text-gray-500 hover:cursor-pointer hover:text-black transition-all duration-150"
                   onClick={() => {
                       router.push("/auth/login")
                   }}>Войти в аккаунт
                </p>
            </Card>
        </div>
    )
}