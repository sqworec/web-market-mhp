"use client"

import {getProductById} from "@/lib/services/product-service";
import React, {useState} from "react";
import Container from "@/app/container";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {useCurrentUser} from "@/hooks/use-current-user";
import {currentUser} from "@/lib/services/current-user";
import {addProductToCart} from "@/lib/services/cart-service";
import {Input} from "@/components/ui/input";
import AddToCard from "@/components/add-to-card";

interface ProductPersonalCardProps {
    id: string
}

export default function ProductPersonalCard({id}: ProductPersonalCardProps) {

    const [amount, setAmount] = useState("")
    const user = useCurrentUser();

    return (
        <>
            Количество:
            <Input type="number" value={amount} onChange={(i) => setAmount(i.target.value)}/>
            <AddToCard userId={user?.id!} productId={id} amount={amount}/>
        </>
    )
}