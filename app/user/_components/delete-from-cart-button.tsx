"use client"

import {Trash2} from "lucide-react";
import toast from "react-hot-toast";
import {deleteProductFromCart} from "@/lib/services/cart-service";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

interface DeleteFromCartButtonProps {
    userId: string;
    productId: string;
}

export default function DeleteFromCartButton({userId, productId}: DeleteFromCartButtonProps) {

    const router = useRouter();

    const deleteHandler = () => {
        deleteProductFromCart(userId, productId).then(i => {
                toast.success("Удалено!")
                router.refresh()
        })
    }

    return (
        <div
            onClick={deleteHandler}
            className="items-center flex justify-between ml-10 hover:cursor-pointer"
        >
            <Trash2 className="text-red-500"/>
        </div>
    )
}