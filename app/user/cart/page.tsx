import Container from "@/app/container";
import {getCartProductsByUserId} from "@/lib/services/cart-service";
import {getCurrentUser} from "@/lib/services/get-current-user";
import CartProductCard from "@/app/user/_components/cart-product-card";
import {calculateCartTotal, getProductById} from "@/lib/services/product-service";
import {Order} from "@prisma/client";
import {createOrder} from "@/lib/services/order-service";
import OrderButton from "@/app/user/cart/_components/order-button";

export default async function CartPage() {
    const currentUser = await getCurrentUser()
    const cartProducts = await getCartProductsByUserId(currentUser?.id!)
    const totalAmount = await calculateCartTotal(currentUser?.id!)

    let order: Order | null
    const orderHandler = async () => {
        order = await createOrder(currentUser?.id!, totalAmount.toString())
    }

    return (
        <div className="mt-20">
            <Container>
                {
                    (cartProducts?.length === 0) &&
                    <div className="flex justify-center items-center  text-xl text-neutral-500">
                        В корзине пока что пусто. Добавьте сюда то, что хотите заказать!
                    </div>
                }
                {cartProducts?.map((cartProduct) => (
                    <CartProductCard
                        userId={currentUser?.id!}
                        cartProduct={cartProduct}
                        key={cartProduct.id}
                    />
                ))
                }

                {
                    (cartProducts?.length! > 0) &&
                    <div className="flex flex-row justify-between items-center right-full h-full px-10">
                        <div className="text-lg h-full">
                                Итоговая сумма: {totalAmount} BYN
                        </div>
                        <OrderButton
                            totalAmount={totalAmount.toString()}
                        />
                    </div>
                }
            </Container>
        </div>
    )
} 