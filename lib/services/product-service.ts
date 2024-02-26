import {db} from "@/lib/db";

export const getAllProducts = async () => await db.product.findMany()

export const getProductById = async (id: string) =>
    await db.product.findUnique({
        where: {
            id : parseInt(id, 10)
        }
    })

