import {getProductById} from "@/lib/services/product-service";
import {Favorite} from "@prisma/client";
import Link from "next/link";
import DeleteFromFavoriteButton from "@/app/user/_components/delete-from-favorite-button";
import DeleteFromCartButton from "@/app/user/_components/delete-from-cart-button";

interface FavoriteProductCardProps {
    favoriteProduct: Favorite,
    userId: string
}

export default async function FavoriteProductCard({favoriteProduct, userId}: FavoriteProductCardProps) {
    const product = await getProductById(favoriteProduct.productId.toString())

    return (
        <div className="relative w-full rounded-xl drop-shadow-md bg-white mb-5 p-0 z-10">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
                <img
                    src={product?.imgUrl}
                    alt={product?.title}
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                />
                <div className="flex flex-row justify-between h-full px-10 py-5 relative z-10">
                    <div className="flex justify-center items-center">
                        <Link href={`/products/${product?.id}`}>
                            <div className="font-bold">
                                {product?.title}
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-between items-center">
                        <DeleteFromFavoriteButton
                            userId={userId}
                            productId={product?.id!.toString()!}
                        />
                    </div>
                </div>
            </div>
        </div>

        // <Link href={`/products/${product?.id}`}>
        //     <div
        //         className="relative w-full h-[100px] rounded-xl drop-shadow-md bg-white mb-5 p-0"
        //     >
        //         <img
        //             src={product?.imgUrl}
        //             alt={product?.title}
        //             className="opacity-30 absolute w-full h-full object-cover rounded-xl"
        //         />
        //
        //         <div
        //             className="flex h-full justify-between items-center py-5 px-10"
        //         >
        //             <div className="font-bold">
        //                 {product?.title}
        //             </div>
        //             <DeleteFromFavoriteButton
        //                 userId={userId}
        //                 productId={product?.id!.toString()!}
        //             />
        //         </div>
        //     </div>
        // </Link>
    )
}