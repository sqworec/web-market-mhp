"use server"

import {
    createNewProductInCart,
    updateCartProductByProductId
} from "@/lib/services/cart-service";
import {db} from "@/lib/db";
import toast from "react-hot-toast";

export const addProductToCart = async (userId: string, productId: number, updAmount: string) => {

    const isExisting = await db.cart.findUnique(
        {
            where: {
                productId: productId,
            }
        }
    )

    if (!isExisting){
        await createNewProductInCart(userId, productId.toString(), updAmount)
        toast.success("Добавлено в корзину")
    }
    else {
        await updateCartProductByProductId(productId, updAmount)
        toast.success("Корзина обновлена")
    }

}