import {getProductById} from "@/lib/services/product-service";
import {Cart, Product} from "@prisma/client";
import Link from "next/link";
import DeleteFromCartButton from "@/app/user/_components/delete-from-cart-button";

interface CartProductCardProps {
    cartProduct: Cart,
    userId: string
}

export default async function CartProductCard({cartProduct, userId}: CartProductCardProps) {

    const product = await getProductById(cartProduct?.productId!.toString()!);

    return (
        <div className="hover:drop-shadow-xl transition-all duration-300 relative w-full rounded-xl drop-shadow-sm bg-white mb-5 p-0 z-10">
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
                        <div className="flex flex-col">
                            <div>{cartProduct.quantity} шт.</div>
                            <div>{Math.round(cartProduct?.quantity * product?.price!).toFixed(2)} BYN ({product?.price!.toFixed(2)} за шт.)</div>
                        </div>
                        <DeleteFromCartButton
                            userId={userId}
                            productId={product?.id!.toString()!}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
