"use client"

import {Button} from "@/components/ui/button";
import {Order} from "@prisma/client";
import {createOrder, createOrderItem} from "@/lib/services/order-service";
import {useCurrentUser} from "@/hooks/use-current-user";
import {useRouter} from "next/navigation";
import {getProductsFromCartByUserId} from "@/lib/services/product-service";
import {clearCart, getCartProductByProductId} from "@/lib/services/cart-service";

interface OrderButtonProps {
    totalAmount: string
}

export default function OrderButton({totalAmount}: OrderButtonProps) {

    const user = useCurrentUser()
    const router = useRouter()

    const orderHandler = async () => {
        const order = await createOrder(user?.id!, totalAmount)
        const products = await getProductsFromCartByUserId(user?.id!)

        for (const product of products!) {
            const prod = await getCartProductByProductId(product?.id.toString(), user?.id!)

            await createOrderItem(
                order?.id!.toString()!,
                product?.id!.toString()!,
                prod?.quantity.toString()!,
                product?.price!.toString()!,
                (product?.price! * prod?.quantity!).toString()!
            )
        }

        await clearCart()

        router.push(`/user/orders/${order?.id}`)
    }

    return (
        <>
            <Button
                className="w-1/5"
                onClick={orderHandler}
            >
                Заказать
            </Button>
        </>
    )
}