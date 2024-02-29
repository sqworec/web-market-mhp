import {getProductById} from "@/lib/services/product-service";
import {Product} from "@prisma/client";
import {useState} from "react";

interface ProductCardProps {
    productId: string
}

export default function ProductCard({productId}: ProductCardProps) {
    const [product, setProduct] = useState<Product | null>(null)

    getProductById(productId).then(i => {
        setProduct(i)
    })

    return (
        <div>
             adsf {!!product?.title}
            <div
                className="w-full h-full rounded-xl drop-shadow-md bg-white p-10"
            >
                <div
                    className="relative w-[30%] h-[20%]"
                >
                    <img
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={product?.imgUrl!}
                        alt={product?.title!}
                    />
                </div>
            </div>
        </div>
    )
}