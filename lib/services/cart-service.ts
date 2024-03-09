"use server"

import {db} from "@/lib/db";

export const createNewProductInCart = async (userId: string, productId: string, quantity: string) => {
    try {
        await db.cart.create({
            data: {
                userId,
                productId: parseInt(productId, 10),
                quantity: parseInt(quantity, 10),
            },
        })
    } catch (error) {
        console.error('Error creating cart item:', error);
    }
}

export const deleteProductFromCart = async (userId: string, productId: string) => {
    try {
        await db.cart.delete({
            where: {
                userId_productId: {
                    userId,
                    productId: parseInt(productId, 10),
                },
            },
        })
    } catch (error) {
        console.error('Error deleting cart item:', error);
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

export const updateCartProductByProductId = async (userId: string, productId: number, updQuantity: string) => {
    try {
        return await db.cart.update({
            where: {
                userId_productId: {
                    userId,
                    productId: productId,
                },
            },
            data: {
                quantity: parseInt(updQuantity, 10)
            }
        })

    } catch (error) {
        console.error("Error updating cart product:", error)
    }
}

export const clearCart = async () => {
    try {
        await db.cart.deleteMany()
    } catch (error) {
        console.error("Error clearing cart: ", error)
    }
}