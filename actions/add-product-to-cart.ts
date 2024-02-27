import {createNewProductInCart} from "@/lib/services/cart-service";
import {db} from "@/lib/db";

export const addProductToCart = async (userId: string, productId: number, amount: string) => {

    const isExisting = await db.cart.findUnique({
        where: {
            productId: productId
        }
    })

    if (!isExisting)
        createNewProductInCart(userId, productId.toString(), amount)
    else {
        await db.cart.update({
            where: {
                productId: productId
            },
            data: {
                amount: 
            }
        })
    }

}