import {db} from "@/lib/db";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";

export const addProductToCart = async (userId: string, productId: string, amount: string) => {
    try {
        const addToCart = await db.cart.create({
            data: {
                userId,
                productId: parseInt(productId, 10),
                amount: parseInt(productId, 10),
            }
        })
    } catch {
        return null
    }
}
