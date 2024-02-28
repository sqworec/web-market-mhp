import {getProductById} from "@/lib/services/product-service";
import {Cart} from "@prisma/client";
import {addProductToCart} from "@/actions/add-product-to-cart";

interface CartProductCardProps {
    cartProduct: Cart
}

export default async function CartProductCard({cartProduct}: CartProductCardProps) {
    const product = await getProductById(cartProduct.productId.toString())


    return (
        <div
            className="w-full h-[100px] rounded-xl drop-shadow-md bg-white mb-5 p-5 flex justify-between"
        >
            <div>
                {product?.title}
            </div>
            <div>
                {cartProduct.amount}
            </div>
        </div>
    )
}