"use server"

import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

export const getAllProducts = async () => {
    try {
        return await db.product.findMany()
    } catch (error) {
        console.error("Error getting all products: ", error)
        return null
    }
}

export const getProductById = async (id: string) => {
    try {
        return await db.product.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        })

    } catch (error) {
        console.error("Error getting product by id: ", error)
        return null
    }
}

export const createProduct = async (title: string,
                                    price: string,
                                    category: string,
                                    proteins: string,
                                    fats: string,
                                    carbohydrates: string,
                                    energyValue: string,
                                    storageConditions: string,
                                    description: string,
                                    imgUrl: string) => {
    try {
        await db.product.create({
            data: {
                title,
                price: parseFloat(price),
                category,
                proteins: parseFloat(proteins),
                fats: parseFloat(fats),
                carbohydrates: parseFloat(carbohydrates),
                energyValue: parseFloat(energyValue),
                storageConditions,
                description,
                imgUrl
            }
        })
    } catch (error) {
        console.error("Error creating product: ", error)
        return null
    }
}

export const updateProduct = async (id: string,
                                    title: string,
                                    price: string,
                                    category: string,
                                    proteins: string,
                                    fats: string,
                                    carbohydrates: string,
                                    energyValue: string,
                                    storageConditions: string,
                                    description: string,
                                    imgUrl: string) => {
    try {
        await db.product.update({
            where: {
                id: parseInt(id, 10)
            },
            data: {
                title,
                price: parseFloat(price),
                category,
                proteins: parseFloat(proteins),
                fats: parseFloat(fats),
                carbohydrates: parseFloat(carbohydrates),
                energyValue: parseFloat(energyValue),
                storageConditions,
                description,
                imgUrl
            }
        })

        revalidatePath(`/products/${id}`)
    } catch (error) {
        console.error("Error updating product: ", error)
        return null
    }
}

export const deleteProduct = async (productId: string) => {
    try {
        await db.product.delete({
            where: {
                id: parseInt(productId, 10)
            }
        })
    } catch (error) {
        console.error("Error deleting product: ", error)
    }
}

export const getProductsFromCartByUserId = async (userId: string) => {
    try {
        return await db.product.findMany({
            include: {
                Cart: {
                    where: {
                        userId,
                    },
                },
            },
        })
    } catch (error) {
        console.log("Error getting products with cart info: ", error)
    }
}