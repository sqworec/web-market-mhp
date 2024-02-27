
import {Product} from "@prisma/client";
import {getProductById} from "@/lib/services/product-service";

interface CartProductCardProps {
    productId: string
}

export default async function CartProductCard({productId}: CartProductCardProps) {
    const product = await getProductById(productId)

    return (
        <div>
            {product?.title}
        </div>
    )
}