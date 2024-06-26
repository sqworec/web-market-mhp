"use client"

import {Button} from "@/components/ui/button";
import {deleteProduct} from "@/lib/services/product-service";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface DeleteProductButtonProps {
    productId: string
}

export default function DeleteProductButton({productId}: DeleteProductButtonProps) {
    const router = useRouter()
    const deleteProductHandler = async () => {
        deleteProduct(productId).then(i => {
            toast.success("Продукт удален")
            router.push("/products")
            router.refresh()
        })
    }

    return (
        <Button
            className="w-full mt-5 bg-red-500 hover:bg-red-700"
            onClick={deleteProductHandler}
        >
            Удалить продукт
        </Button>
    )
}