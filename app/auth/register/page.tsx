"use client"

import * as React from "react"
import SignUpForm from "@/app/auth/sign-up-form";
import {useRouter} from "next/navigation";


export default function LoginPage() {

    const router = useRouter()
    return (
        <>
            <SignUpForm/>
            <p className="flex justify-around text-sm text-gray-500 m-5 hover:cursor-pointer hover:text-black"
               onClick={() => {
                   router.push("/auth/login")
               }}>Войти в аккаунт</p>
        </>
    )
}