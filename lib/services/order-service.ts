"use server"

import {db} from "@/lib/db";

export const createOrder = async (userId: string, totalAmount: string) => {
    try {
        return await db.order.create({
            data: {
                userId,
                totalAmount: parseFloat(totalAmount),
                date: new Date(),
            }
        })
    } catch (error) {
        console.error("Error creating order: ", error)
        return null
    }
}

export const getOrdersByUserId = async (userId: string) => {
    try {
        return await db.order.findMany({
            where: {
                userId
            }
        })
    } catch (error) {
        console.error("Error getting orders: ", error)
    }
}

export const getOrderById = async (id: string) => {
    try {
        return await db.order.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        })
    } catch (error) {
        console.error("Error getting order: ", error)
    }
}

export const createOrderItem = async (orderId: string, productId: string, quantity: string, price: string, totalPrice: string) => {
    try {
        await db.orderItem.create({
            data: {
                orderId: parseInt(orderId, 10),
                productId: parseInt(productId, 10),
                quantity: parseInt(quantity, 10),
                price: parseFloat(price),
                totalPrice: parseFloat(totalPrice)
            }
        })
    } catch (error) {
        console.error("Error creating order item: ", error)
    }
}

export const getOrderItemsByOrderId = async (orderId: string) => {
    try {
        return await db.orderItem.findMany({
            where: {
                orderId: parseInt(orderId, 10)
            }
        })
    } catch (error) {
        console.error("Error getting order items: ", error)
    }
}


