"use client"

import {useEffect, useState, useTransition} from "react";
import {Input} from "@/components/ui/input";
import {useCurrentUser} from "@/hooks/use-current-user";
import Container from "@/app/container";
import {AddToCartButton} from "@/app/products/_components/add-to-cart";
import {toggleFavorite} from "@/actions/toggle-favorite";
import {Button} from "@/components/ui/button";
import {isAlreadyFavorite} from "@/lib/services/favorites-service";
import {getCartProductByProductId} from "@/lib/services/cart-service";

export default function ProductPage({params}: { params: { id: string } }) {
    const [amount, setAmount] = useState("1")
    const [favoriteLabel, setFavoriteLabel] = useState("Добавить в избранное")
    const [isPending, startTransition] = useTransition()
    const user = useCurrentUser()

    const favoriteLabelToggle = () => {
        if (favoriteLabel == "Добавить в избранное") setFavoriteLabel("Удалить из избранного")
        if (favoriteLabel == "Удалить из избранного") setFavoriteLabel("Добавить в избранное")
    }

    useEffect(() => {
        isAlreadyFavorite(user?.id!, params.id).then(i => {
            if (!i?.id) setFavoriteLabel("Добавить в избранное")
            else setFavoriteLabel("Удалить из избранного")
        })

        getCartProductByProductId(params.id, user?.id!).then(i => {
            const isExisting = i?.amount!
            if (isExisting) setAmount(i?.amount!.toString())
        })

    }, [user, params]);

    const favotiteClickHandler = () => {
        startTransition(() => {
            toggleFavorite(user?.id!, params.id)
            favoriteLabelToggle()
        })
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
                    disabled={isPending}
                    onClick={favotiteClickHandler}
                    className="w-full mt-5"
                >
                    {favoriteLabel}
                </Button>
            </Container>
        </div>
    )
}