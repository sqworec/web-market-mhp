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

export const getFavoriteProductsByUserId = async (userId: string) => {
    try {
        const products = await db.favorite.findMany({
            where: {
                userId
            }
        })
    } catch (error) {
        console.error("Error getting favorite products:", error)
    }
}