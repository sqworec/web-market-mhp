"use client"

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createNewProductInCart} from "@/lib/services/cart-service";
import {useCurrentUser} from "@/hooks/use-current-user";
import Container from "@/app/container";
import {addProductToFavorite} from "@/lib/services/favorites-service";
import {addProductToCart} from "@/actions/add-product-to-cart";
import {AddToCartButton} from "@/app/products/add-to-cart";

export default function ProductPage({params}: { params: { id: string } }) {
    const [amount, setAmount] = useState("1")
    const user = useCurrentUser()

    const favoritesClickHandle = () => {
        addProductToFavorite(user?.id!, params.id)
    }

    return (
        <div className="mt-20">
            <Container>
                <Input
                    type="number"
                    value={amount}
                    onChange={(i) => setAmount(i.target.value)}
                />
                <AddToCartButton
                    userId={user?.id!}
                    productId={params.id}
                    amount={amount}
                />
                <Button
                    onClick={favoritesClickHandle}
                    className="w-full mt-5"
                >
                    В избранное
                </Button>
            </Container>
        </div>
    )
}