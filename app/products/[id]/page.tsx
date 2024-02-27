"use client"

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createNewProductInCart} from "@/lib/services/cart-service";
import {useCurrentUser} from "@/hooks/use-current-user";
import Container from "@/app/container";
import {addProductToFavorite} from "@/lib/services/favorites-service";

export default function ProductPage({params}: { params: { id: string } }) {
    const [amount, setAmount] = useState("")
    const user = useCurrentUser()

    const cartClickHandle = () => {
        createNewProductInCart(user?.id!, params.id, amount)
    }
    const favoritesClickHandle = () => {
        addProductToFavorite(user?.id!, params.id, amount)
    }

    return (
        <div className="mt-20">
            <Container>
                <Input
                    type="number"
                    value={amount}
                    onChange={(i) => setAmount(i.target.value)}
                />

                <Button
                    onClick={cartClickHandle}
                    className="w-full mt-5"
                >
                    В корзину
                </Button>
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