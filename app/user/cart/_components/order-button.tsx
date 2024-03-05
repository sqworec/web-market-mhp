"use client"

import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";

export default function OrderButton() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <>
            <Button
                className="w-1/5"
                onClick={() => {
                    router.push(pathname + "/order")
                }}
            >
                К оформлению
            </Button>
        </>
    )
}