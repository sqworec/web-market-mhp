"use client"

import {Button} from "@/components/ui/button";
import {addProductToCart} from "@/actions/add-product-to-cart";
import {useEffect, useState, useTransition} from "react";
import toast from "react-hot-toast";
import {getCartProductByProductId} from "@/lib/services/cart-service";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

interface AddToCartButtonProps {
    userId: string,
    productId: string,
}

export const AddToCartForm = ({userId, productId}: AddToCartButtonProps) => {
    const [quantity, setQuantity] = useState("10")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const cartClickHandle = () => {
        startTransition(() => {
            addProductToCart(userId, parseInt(productId), quantity)

            if (quantity === "0") toast.success("Удалено из корзины")
            else toast.success("Добавлено в корзину")
            router.refresh()
        })
    }

    useEffect(() => {
        getCartProductByProductId(productId, userId).then(i => {
            const isExisting = i?.quantity!
            if (isExisting) setQuantity(i?.quantity!.toString())
        })
    }, [productId, userId])


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center pl-[55px]">
                <div>
                    Количество:
                </div>
                <Input
                    className="border-none text-center xl:w-[7vw] sm:w-[15vw] focus:outline-none font-bold"
                    disabled={isPending}
                    type="number"
                    value={quantity}
                    onChange={(i) => {
                        if (parseInt(i.target.value) < 10) setQuantity("10")
                        else setQuantity(i.target.value)
                    }}
                />
            </div>
            <Button
                disabled={isPending}
                onClick={cartClickHandle}
                className="w-full mt-5"
            >
                В корзину
            </Button>
        </div>
    )
}