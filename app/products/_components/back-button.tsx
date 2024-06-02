"use client"
import {Button} from "@/components/ui/button";

export default function BackButton() {
    const handleBack = () => {
        window.history.back()
    }

    return (
        <Button onClick={handleBack}>
            Назад
        </Button>

    )
}