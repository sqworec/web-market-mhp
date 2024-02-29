import {Button} from "@/components/ui/button";
import {addProductToCart} from "@/actions/add-product-to-cart";
import {useTransition} from "react";
import toast from "react-hot-toast";
import {getCartProductByProductId} from "@/lib/services/cart-service";

interface AddToCartButtonProps {
    userId: string,
    productId: string,
    amount: string
}

export const AddToCartButton = ({userId, productId, amount}: AddToCartButtonProps) => {
    const [isPending, startTransition] = useTransition()

    const cartClickHandle = () => {
        startTransition(() => {
            addProductToCart(userId, parseInt(productId), amount)

            if (amount === "0") toast.success("Удалено из корзины")
            else toast.success("Добавлено в карзину")

        })
    }

    return (
        <Button
            disabled={isPending}
            onClick={cartClickHandle}
            className="w-full mt-5"
        >
            В корзину
        </Button>
    )
}