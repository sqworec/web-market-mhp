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
                className="relative w-full h-[100px] rounded-xl drop-shadow-md bg-white mb-5 p-0"
            >
                <img
                    src={product?.imgUrl}
                    alt={product?.title}
                    className="opacity-30 absolute w-full h-full object-cover rounded-xl"
                />

                <div
                    className="flex h-full justify-between items-center py-5 px-10"
                >
                    <b>
                        {product?.title}
                    </b>
                </div>
            </div>
        </Link>
    )
}