"use client"

import {Button} from "@/components/ui/button";
import {useEffect, useState, useTransition} from "react";
import {isAlreadyFavorite} from "@/lib/services/favorites-service";
import {toggleFavorite} from "@/actions/toggle-favorite";

interface AddToCartButtonProps {
    userId: string,
    productId: string,
}

export const AddToFavoritesButton = ({userId, productId}: AddToCartButtonProps) => {
    const [isPending, startTransition] = useTransition()
    const [favoriteLabel, setFavoriteLabel] = useState("Добавить в избранное")

    const favoriteLabelToggle = () => {
        if (favoriteLabel == "Добавить в избранное") setFavoriteLabel("Удалить из избранного")
        if (favoriteLabel == "Удалить из избранного") setFavoriteLabel("Добавить в избранное")
    }

    useEffect(() => {
        isAlreadyFavorite(userId, productId).then(i => {
            if (!i?.id) setFavoriteLabel("Добавить в избранное")
            else setFavoriteLabel("Удалить из избранного")
        })
    }, [userId, productId])

    const favoriteClickHandler = () => {
        startTransition(() => {
            toggleFavorite(userId, productId)
            favoriteLabelToggle()
        })
    }

    return (
        <Button
            disabled={isPending}
            onClick={favoriteClickHandler}
            className="w-full mt-5"
        >
            {favoriteLabel}
        </Button>
    )
}