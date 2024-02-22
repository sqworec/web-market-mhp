"use client"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
import SignInForm from "@/app/auth/sign-in-form";
import SignUpForm from "@/app/auth/sign-up-form";


export default function AuthPage() {

    const [toggle, setToggle] = useState(true)
    return (
        <>
            {/*TODO: current user*/}
            {toggle ? <SignInForm/> : <SignUpForm/>}
            {
            toggle ?
            <p className="flex justify-around text-sm text-gray-500 m-5 hover:cursor-pointer hover:text-black" onClick={() => {setToggle(!toggle)}}>Зарегистрироваться</p> :
            <p className="flex justify-around text-sm text-gray-500 m-5 hover:cursor-pointer hover:text-black" onClick={() => {setToggle(!toggle)}}>Войти в аккаунт</p>
            }
        </>
    )
}