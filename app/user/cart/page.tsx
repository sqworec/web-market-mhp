import Container from "@/app/container";
import {useCurrentUser} from "@/hooks/use-current-user";
import {getCartProductsByUserId} from "@/lib/services/cart-service";
import {getCurrentUser} from "@/lib/services/get-current-user";
import CartProductCard from "@/app/user/cart-product-card";

export default async function CartPage() {
    const currentUser = await getCurrentUser()
    const products = await getCartProductsByUserId(currentUser?.id!)

    return (
        <div className="mt-20">
            <Container>
                {products?.map((product) => (
                    <CartProductCard
                        productId={product.productId.toString()}
                        key={product.id}
                    />
                ))}
            </Container>
        </div>
    )
} 