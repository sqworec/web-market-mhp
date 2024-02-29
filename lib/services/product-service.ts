import {db} from "@/lib/db";

export const getAllProducts = async () => {
    try {
        return await db.product.findMany()
    } catch {
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

    } catch {
        return null
    }

}

