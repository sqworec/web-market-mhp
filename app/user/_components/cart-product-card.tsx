"use client"

import {getProductById} from "@/lib/services/product-service";
import {Cart, Product} from "@prisma/client";
import Link from "next/link";
import {Trash2} from "lucide-react";
import {deleteProductFromCart} from "@/lib/services/cart-service";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

interface CartProductCardProps {
    cartProduct: Cart,
    userId: string
}

export default function CartProductCard({cartProduct, userId}: CartProductCardProps) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductById(cartProduct?.productId!.toString()!)
            setProduct(fetchedProduct)
        }
        fetchProduct()
    }, [cartProduct?.productId]);
    const deleteHandler = () => {
        deleteProductFromCart(userId, product?.id!.toString()!)
        toast.success("Удалено!")
    }

    return (
        <div
            className="relative w-full h-[100px] rounded-xl drop-shadow-md bg-white mb-5 p-0"
        >
            <img
                src={product?.imgUrl}
                alt={product?.title}
                className="opacity-30 absolute w-full h-full object-cover rounded-xl"
            />

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
                    <div className="items-center flex justify-between ml-10">
                        <Trash2
                            onClick={deleteHandler}
                            className="text-red-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}