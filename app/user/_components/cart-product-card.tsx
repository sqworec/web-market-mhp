import {getProductById} from "@/lib/services/product-service";
import {Cart, Product} from "@prisma/client";
import Link from "next/link";
import {Trash2} from "lucide-react";
import {deleteProductFromCart, getCartProductByProductId} from "@/lib/services/cart-service";
import DeleteFromCartButton from "@/app/user/_components/delete-from-cart-button";

interface CartProductCardProps {
    cartProduct: Cart,
    userId: string
}

export default async function CartProductCard({cartProduct, userId}: CartProductCardProps) {

    const product = await getProductById(cartProduct?.productId!.toString()!);

    return (
        <div
            className="relative w-full h-[100px] rounded-xl drop-shadow-md bg-white mb-5 p-0 z-10"
        >
            {/*<img*/}
            {/*    src={product?.imgUrl}*/}
            {/*    alt={product?.title}*/}
            {/*    className="opacity-30 absolute w-full h-full rounded-xl object-cover select-none z-0"*/}
            {/*/>*/}

            <div className="flex h-full justify-between items-center py-5 px-10">
                <Link href={`/products/${product?.id}`}>
                    <div className="font-bold">
                        {product?.title}
                    </div>
                </Link>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <div>
                            {cartProduct.amount} шт.
                        </div>
                        <div>
                            {Math.round(cartProduct?.amount * product?.price! * 100) / 100} BYN
                        </div>
                    </div>
                   <DeleteFromCartButton userId={userId} productId={product?.id!.toString()!}/>
                </div>
            </div>
        </div>
    )
}