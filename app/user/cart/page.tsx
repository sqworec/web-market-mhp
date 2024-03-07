import Container from "@/app/container";
import {getCartProductsByUserId} from "@/lib/services/cart-service";
import {getCurrentUser} from "@/lib/services/get-current-user";
import CartProductCard from "@/app/user/_components/cart-product-card";
import OrderButton from "@/app/user/cart/_components/order-button";
import {Product} from "@prisma/client";
import {getProductById} from "@/lib/services/product-service";

export default async function CartPage() {
    const currentUser = await getCurrentUser()
    const cartProducts = await getCartProductsByUserId(currentUser?.id!)

    let totalAmount = 0

    for (const cartProduct of cartProducts!) {
        const product = await getProductById(cartProduct?.productId!.toString());
        totalAmount += product?.price! * cartProduct.quantity;
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
                        <OrderButton/>
                    </div>
                }
            </Container>
        </div>
    )
} 