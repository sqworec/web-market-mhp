"use server"

import {db} from "@/lib/db";

export const addProductToCart = async (userId: string, productId: string, amount: string) => {
    try {
        const newCartItem = await db.cart.create({
            data: {
                userId,
                productId: parseInt(productId, 10),
                amount: parseInt(amount, 10),
            },
        })
        console.log('Created cart item:', newCartItem);
    } catch (error) {
        console.error('Error creating cart item:', error);
    }
}

export const getCartProductsByUserId = async (userId: string) => {
    try {
        return await db.cart.findMany({
            where: {
                userId
            }
        })
    } catch (error) {
        console.error("Error getting cart products:", error)
    }
}