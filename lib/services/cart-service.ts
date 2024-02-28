"use server"

import {db} from "@/lib/db";

export const createNewProductInCart = async (userId: string, productId: string, amount: string) => {
    try {
        const newCartItem = await db.cart.create({
            data: {
                userId,
                productId: parseInt(productId, 10),
                amount: parseInt(amount, 10),
            },
        })
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

export const getCartProductByProductId = async (productId: string) => {
    try {
        return await db.cart.findUnique({
            where: {
                productId: parseInt(productId, 10)
            }
        })
    } catch (error) {
        console.error("Error getting cart product:", error)
    }
}

export const updateCartProductByProductId = async (productId: number, amount: string) => {
    try {
        return await db.cart.update({
            where: {
                productId: productId
            },
            data: {
                amount: {
                    increment: parseInt(amount, 10)
                }
            }
        })

    } catch (error) {
        console.error("Error updating cart product:", error)
    }
}