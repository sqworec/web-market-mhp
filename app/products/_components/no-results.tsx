"use client"

import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";

export default function NoResults() {
    const router = useRouter()

    return (
        <div className="flex justify-center items-center flex-col mt-[30vh] w-full h-full">
            <div className="text-neutral-500 text-2xl mb-2">
                Похоже, по данному запросу продукции не найдено...
            </div>
            <Button
                onClick={() => {
                    router.push("/products")
                }}
            >
                Сбросить фильтры
            </Button>
        </div>
    )
}