"use server"

import {getUserById} from "@/lib/services/user-service";
import {getCurrentUser} from "@/lib/services/get-current-user";
import {getCartProductsByUserId} from "@/lib/services/cart-service";
import {getProducts} from "@/actions/get-products";
import {getProductsFromCartByUserId} from "@/lib/services/product-service";

export default async function InvoicePage() {
    const user = await getCurrentUser()
    const userProducts = await getProductsFromCartByUserId(user?.id!)

    return (
        <div>
            {userProducts?.map(product => (
                <div key={product?.id}>
                    {product?.title}
                </div>
            ))}
        </div>
    )
}