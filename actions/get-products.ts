import {getAllProducts} from "@/lib/services/product-service";

export const getProducts = async () => {
    return await getAllProducts()
}