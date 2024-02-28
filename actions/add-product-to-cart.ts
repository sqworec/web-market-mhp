"use server"

import {createNewProductInCart, getCartProductByProductId} from "@/lib/services/cart-service";
import {db} from "@/lib/db";

export const addProductToCart = async (userId: string, productId: number, updAmount: string) => {

    const currentProduct = await getCartProductByProductId(productId.toString())

    const isExisting = await db.cart.findUnique(
        {
            where: {
                productId : productId,
            }
        }
    )

    if (!isExisting)
        createNewProductInCart(userId, productId.toString(), updAmount)
    else {
        await db.cart.update({
            where: {
                productId: productId
            },
            data: {
                amount: {
                    increment: parseInt(updAmount, 10)
                }
            }
        })
    }

}