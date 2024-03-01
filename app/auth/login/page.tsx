"use client"

import * as React from "react"
import * as z from "zod"
import {LoginSchema} from "@/schemas";
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
import {login} from "@/actions/login";
import {useState, useTransition} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data !== undefined) {
                        setError(data.error)
                        setSuccess(data.error)
                    }
                })
        })
    }
    return (
        <div className="flex justify-around mt-[5%]">
            <Card className="w-[550px] p-20 rounded-2xl border-none">
                <CardHeader>
                    <CardTitle>C Возвращением!</CardTitle>
                    <CardDescription>Войдите в аккаунт</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="grid w-full items-center gap-4 mb-5">
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
                                Войти
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <p className="flex justify-around text-sm text-gray-500 hover:cursor-pointer hover:text-black transition-all duration-150"
                   onClick={() => {
                       router.push("/auth/register")
                   }}>Зарегистрироваться
                </p>
            </Card>
        </div>
    )
}