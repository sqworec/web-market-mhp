"use client"

import Container from "@/app/container";
import {Input} from "@/components/ui/input";
import {useState, useTransition} from "react";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {updateProduct} from "@/lib/services/product-service";
import toast from "react-hot-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import categories from "@/data/categories";
import {UploadButton} from "@/utils/uploadthing";
import {useCurrentUser} from "@/hooks/use-current-user";
import {useRouter} from "next/navigation";

export default function OrderForm() {
    const [organization, setOrganization] = useState("")
    const [payerAndAddress, setPayerAndAddress] = useState("")
    const [bankAccountNumber, setBankAccountNumber] = useState("")

    const [isPending, startTransition] = useTransition()

    const user = useCurrentUser()
    const router = useRouter()

    const updateHandler = () => {
        startTransition(() => {
            if ((organization || payerAndAddress || bankAccountNumber) === "") {
                toast.error("Заполните поля!")
                return
            }

        })
    }

    return (
        <Container>
            <div
                className="flex flex-col justify-center items-center my-20 p-10 w-full bg-white drop-shadow-md rounded-xl">
                <div className="font-bold text-2xl">
                    Оформление заказа
                </div>
                <div className="text-neutral-500 text-lg">
                    Укажите необходимые данные
                </div>
                <div className="w-1/2 mt-5">
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Организация
                        </div>
                        <Input
                            disabled={isPending}
                            value={organization}
                            onChange={(i) => {
                                setOrganization(i.target.value)
                            }}
                            placeholder="Введите навание организации"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Плательщик и его адрес
                        </div>
                        <Textarea
                            disabled={isPending}
                            value={payerAndAddress}
                            onChange={(i) => {
                                setPayerAndAddress(i.target.value)
                            }}
                            placeholder="Введите данные"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Номер счета и банк
                        </div>
                        <Input
                            disabled={isPending}
                            value={bankAccountNumber}
                            onChange={(i) => {
                                setBankAccountNumber(i.target.value)
                            }}
                            placeholder="Введите номер рассчетного счета и название банка"
                        />
                    </div>
                    <Button
                        disabled={isPending}
                        className="w-full mt-5"
                        onClick={updateHandler}
                    >
                        Изменить
                    </Button>
                </div>
            </div>
        </Container>
    )
}