"use client"

import * as React from "react"
import {useState} from "react";
import SignInForm from "@/app/auth/sign-in-form";
import SignUpForm from "@/app/auth/sign-up-form";
import {useRouter} from "next/navigation";


export default function AuthPage() {

    const router = useRouter()
    return (
        <>
            {router.push("/auth/login")}
        </>
    )
}