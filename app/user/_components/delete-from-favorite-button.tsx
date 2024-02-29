"use client"

import {Trash2} from "lucide-react";
import toast from "react-hot-toast";
import {deleteProductFromCart} from "@/lib/services/cart-service";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {toggleFavorite} from "@/actions/toggle-favorite";

interface DeleteFromCartButtonProps {
    userId: string;
    productId: string;
}

export default function DeleteFromFavoriteButton({userId, productId}: DeleteFromCartButtonProps) {

    const router = useRouter();

    const deleteHandler = () => {
        toggleFavorite(userId, productId).then(i => {
                router.refresh()
        })
    }

    return (
        <div
            onClick={deleteHandler}
            className="items-center flex justify-between ml-10 hover:cursor-pointer"
        >
            <Trash2 className="text-red-500 hover:text-red-900 transition duration-300"/>
        </div>
    )
}