"use server"

import {createNewProductInCart} from "@/lib/services/cart-service";
import {Button} from "@/components/ui/button";
import React from "react";
import {getProductById} from "@/lib/services/product-service";
import {getCurrentUser} from "@/lib/services/get-current-user";

interface AddToCartProps
{
    userId: string;
    productId: string;
    amount: string;

}
export default async function AddToCard({userId, productId, amount} : AddToCartProps) {

    const product = await getProductById(productId)
    const user = await getCurrentUser()

    const clickHandler = async () => {
        await createNewProductInCart(userId, product?.id.toString()!, amount)
        console.log(user?.id!, product?.id.toString()!, amount)
    }

    return(
        <div>
            <Button onClick={clickHandler}>
                В корзину
            </Button>
        </div>
    )
}
