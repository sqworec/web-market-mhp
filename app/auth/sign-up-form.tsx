import * as React from "react"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"


export default function SignUpForm() {
    return (
        <div className="flex justify-around mt-[5%]">
            <Card className="w-[550px] p-20 rounded-2xl border-none">
                <CardHeader>
                    <CardTitle>Добро пожаловать!</CardTitle>
                    <CardDescription>Создайте аккаунт</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Ваша почта"/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="fullname">Полное имя</Label>
                                <Input id="fullname" placeholder="Ваше полное имя"/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Пароль</Label>
                                <Input id="password" placeholder="Пароль"/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-around">
                    <Button className="w-full mt-3">Зарегистрироваться</Button>
                </CardFooter>
            </Card>
        </div>
    )
}