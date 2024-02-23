"use client"

import * as React from "react"
import SignInForm from "@/app/auth/sign-in-form";
import {useRouter} from "next/navigation";


export default function LoginPage() {

    const router = useRouter()
    return (
        <>
            <SignInForm/>
            <p className="flex justify-around text-sm text-gray-500 m-5 hover:cursor-pointer hover:text-black"
               onClick={() => {
                   router.push("/auth/register")
               }}>Зарегистрироваться</p>
        </>
    )
}