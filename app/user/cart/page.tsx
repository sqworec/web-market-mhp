import {getCartProductsByUserId} from "@/lib/services/cart-service";
import {getCurrentUser} from "@/lib/services/get-current-user";
import {calculateCartTotal, getProductById} from "@/lib/services/product-service";
import CartProductsList from "@/app/user/cart/_components/cart-products-list";

export default async function CartPage() {
    const currentUser = await getCurrentUser()
    const cartProducts = await getCartProductsByUserId(currentUser?.id!)
    const totalAmount = await calculateCartTotal(currentUser?.id!)

    return (
        <CartProductsList
            cartProducts={cartProducts!}
            totalAmount={totalAmount}
            currentUser={currentUser}
        />
    )
} 