import {Cart} from "@prisma/client";
import Container from "@/app/container";
import CartProductCard from "@/app/user/_components/cart-product-card";
import OrderButton from "@/app/user/cart/_components/order-button";

interface CartProductsListProps {
    cartProducts: Cart[],
    totalAmount: number,
    currentUser: any
}

export default function CartProductsList({cartProducts, totalAmount, currentUser}: CartProductsListProps) {
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
                            Итоговая сумма: {totalAmount.toFixed(2)} BYN
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