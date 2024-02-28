"use server"

import {db} from "@/lib/db";

export const createNewProductInCart = async (userId: string, productId: string, amount: string) => {
    try {
        await db.cart.create({
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

export const getCartProductByProductId = async (productId: string, userId: string) => {
    try {
        return await db.cart.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId: parseInt(productId, 10),
                },
            }
        })
    } catch (error) {
        console.error("Error getting cart product:", error)
    }
}

export const updateCartProductByProductId = async (userId: string, productId: number, updAmount: string) => {
    try {
        return await db.cart.update({
            where: {
                userId_productId: {
                    userId,
                    productId: productId,
                },
            },
            data: {
                amount: parseInt(updAmount, 10)
            }
        })

    } catch (error) {
        console.error("Error updating cart product:", error)
    }
}