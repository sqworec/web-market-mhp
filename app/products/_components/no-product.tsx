"use client"

import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";

export default function NoProduct() {
    const router = useRouter()

    return (
        <div className="flex justify-center items-center flex-col mt-[30vh] w-full h-full">
            <div className="text-neutral-500 text-2xl mb-5">
                Выбранного продукта не существует :(
            </div>
            <Button
                onClick={() => {
                    router.push("/products")
                }}
            >
                На главную
            </Button>
        </div>
    )
}