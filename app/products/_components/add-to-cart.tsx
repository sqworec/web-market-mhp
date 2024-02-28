import {Button} from "@/components/ui/button";
import {addProductToCart} from "@/actions/add-product-to-cart";
import {useTransition} from "react";

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