import {db} from "@/lib/db";

export const createOrder = async (userId: string, organization: string, payerAndAddress: string, bankAccountNumber: string) => {
    try {
        await db.order.create({
            data: {
                userId,
                organization,
                payerAndAddress,
                bankAccountNumber,
                date: new Date(),
            }
        })
    } catch (error) {
        console.error("Error creating order: ", error)
    }
}

export const crateOrderItem = async (orderId: string, productId: string, quantity: string, price: string, totalPrice: string) => {
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

export const getOrdersByUserId = async (userId: string) => {
    try {
        return await db.order.findMany({
            where: {
                userId
            }
        })
    } catch (error) {
        console.log("Error getting order: ", error)
    }
}