import {Button} from "@/components/ui/button";
import {addProductToCart} from "@/actions/add-product-to-cart";

interface AddToCartButtonProps {
    userId: string,
    productId: string,
    amount: string
}

export const AddToCartButton = ({userId, productId, amount}: AddToCartButtonProps) => {

    const cartClickHandle = () => {
        addProductToCart(userId, parseInt(productId), amount)
    }

    return (
        <Button
            onClick={cartClickHandle}
            className="w-full mt-5"
        >
            В корзину
        </Button>
    )
}