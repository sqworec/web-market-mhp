import {db} from "@/lib/db";

export const getAllProducts = async () => {
    try {
        const prodcuts = await db.product.findMany()
        
        return prodcuts
    } catch {
        return null
    }
}

export const getProductById = async (id: string) => {
    try {
        const prodcut = await db.product.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        })

        return prodcut
    } catch {
        return null
    }

}

