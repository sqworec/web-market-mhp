import {getProductById} from "@/lib/services/product-service";
import {Favorite} from "@prisma/client";
import Link from "next/link";

interface FavoriteProductCardProps {
    favoriteProduct: Favorite
}

export default async function FavoriteProductCard({favoriteProduct}: FavoriteProductCardProps) {
    const product = await getProductById(favoriteProduct.productId.toString())

    return (
        <Link href={`/products/${product?.id}`}>
            <div
                className="w-full h-[100px] rounded-xl drop-shadow-md bg-white mb-5 p-5 flex justify-between"
            >
                <div>
                    {product?.title}
                </div>
            </div>
        </Link>
    )
}