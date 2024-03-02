"use client"

import {Button} from "@/components/ui/button";
import {deleteProduct} from "@/lib/services/product-service";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface DeleteProductButtonProps {
    productId: string
}

export default function UpdateProductButton({productId}: DeleteProductButtonProps) {
    const router = useRouter()

    return (
        <Button
            className="w-full mt-5"
            onClick={() => router.push(`/products/${productId}/update`)}
        >
            Изменить продукт
        </Button>
    )
}