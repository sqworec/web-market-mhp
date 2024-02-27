"use client"

import ProductPersonalCard from "@/app/products/product-personal-card";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {addProductToCart} from "@/lib/services/cart-service";

export default function ProductPage({params}: { params: { id: string } }) {
    const [amount, setAmount] = useState("")

    const clickHandle = () => {
        addProductToCart("1", "1", amount)
    }

    return (
        <>
            <Input
                type="number"
                value={amount}
                onChange={(i) => setAmount(i.target.value)}
            />

            <Button
                onClick={clickHandle}
            >
                В корзину
            </Button>
        </>
    )
}