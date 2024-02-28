"use server"

import {
    createNewProductInCart,
    updateCartProductByProductId
} from "@/lib/services/cart-service";
import {db} from "@/lib/db";
import toast from "react-hot-toast";

export const addProductToCart = async (userId: string, productId: number, amount: string) => {

    const isExisting = await db.cart.findUnique(
        {
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            }
        }
    )

    if (!isExisting) {
        await createNewProductInCart(userId, productId.toString(), amount)
    } else {
        await updateCartProductByProductId(userId, productId, amount)
    }

}