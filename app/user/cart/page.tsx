import Container from "@/app/container";
import {getCartProductsByUserId} from "@/lib/services/cart-service";
import {getCurrentUser} from "@/lib/services/get-current-user";
import CartProductCard from "@/app/user/_components/cart-product-card";
import {getProductById} from "@/lib/services/product-service";

export default async function CartPage() {
    const currentUser = await getCurrentUser()
    let products = await getCartProductsByUserId(currentUser?.id!)

    return (
        <div className="mt-20">
            <Container>
                {
                    (products?.length === 0) &&
                    <div className="flex justify-center items-center  text-xl text-neutral-500">
                        В корзине пока что пусто. Добавьте сюда то, что хотите заказать!
                    </div>
                }
                {products
                    ?.sort((a, b) => a.id - b.id)
                    .map((product) => (
                        <CartProductCard
                            userId={currentUser?.id!}
                            cartProduct={product}
                            key={product.id}
                        />
                    ))}
            </Container>
        </div>
    )
} 