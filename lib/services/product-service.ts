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

export const createProductTransaction = async (
    title: string,
    price: string,
    category: string,
    proteins: string,
    fats: string,
    carbohydrates: string,
    energyValue: string,
    storageConditions: string,
    description: string,
    imgUrl: string
) => {
    let result;

    try {
        await db.$transaction(async (tx) => {
            result = await tx.product.create({
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
                    imgUrl,
                },
            });
        });
    } catch (error) {
        console.error('Error creating product transaction: ', error);
        throw error;
    } finally {
        await db.$disconnect();
    }

    return result;
};

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
        const cartProducts = await db.cart.findMany({
            where: {
                userId: userId,
            },
            select: {
                productId: true,
            },
        });

        const productIds = cartProducts.map((cartProduct) => cartProduct.productId);

        return await db.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

    } catch (error) {
        throw new Error(`Error retrieving products: ${error}`);
    }
}

export const getProductsByOrderId = async (orderId: number) => {
    try {
        const orderItems = await db.orderItem.findMany({
            where: {
                orderId: orderId,
            },
            select: {
                productId: true,
            },
        });

        const productIds = orderItems.map((orderItem) => orderItem.productId);

        return await db.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });
    } catch (error) {
        throw new Error(`Error retrieving products by order ID: ${error}`);
    }
}

export const calculateCartTotal = async (userId: string) => {
    try {
        const cartProducts = await db.cart.findMany({
            where: {
                userId,
            },
            include: {
                product: {
                    select: {
                        price: true,
                    },
                },
            },
        });

        let total = 0;
        cartProducts.forEach((cartProduct) => {
            total += cartProduct.product.price * cartProduct.quantity;
        });

        return total;
    } catch (error) {
        throw new Error(`Error calculating cart total: ${error}`);
    }
}