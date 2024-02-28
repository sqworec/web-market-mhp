"use server"

import {db} from "@/lib/db";

export const addProductToFavorite = async (userId: string, productId: string) => {
    try {
        const newFavoritesItem = await db.favorite.create({
            data: {
                userId,
                productId: parseInt(productId, 10),
            },
        })
        console.log('Created favorite item:', newFavoritesItem);
    } catch (error) {
        console.error('Error creating favorite item:', error);
    }
}
export const removeProductFromFavorite = async (userId: string, productId: string) => {
    try {
        const removedFavoriteItem = await db.favorite.delete({
            where: {
                userId,
                productId: parseInt(productId, 10)
            },
        })
    } catch (error) {
        console.error('Error removing favorite item:', error);
    }
}

export const getFavoriteProductsByUserId = async (userId: string) => {
    try {
        return await db.favorite.findMany({
            where: {
                userId
            }
        })
    } catch (error) {
        console.error("Error getting favorite products: ", error)
    }
}

export const getFavoriteProductByProductId = async (userId: string, productId: string) => {
    try {
        return await db.favorite.findUnique({
            where: {
                userId,
                productId: parseInt(productId, 10)
            }
        })
    } catch (error) {
        console.log("Error getting favorite product: ", error)
    }
}

export const isAlreadyFavorite = async (userId: string, productId: string) => {
    return (getFavoriteProductByProductId(userId, productId));
}