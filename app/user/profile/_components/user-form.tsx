"use client"

import {useCurrentUser} from "@/hooks/use-current-user";
import {useEffect, useState, useTransition} from "react";
import Container from "@/app/container";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import categories from "@/data/categories";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {UploadButton} from "@/utils/uploadthing";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button";
import {updateProduct} from "@/lib/services/product-service";
import {updateUserById} from "@/lib/services/user-service";
import {useRouter} from "next/navigation";
import {getCurrentUser} from "@/lib/services/get-current-user";

export default function UserForm() {

    const user = useCurrentUser()

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const [name, setName] = useState(user?.name!)
    const [email, setEmail] = useState(user?.email!)

    const [organization, setOrganization] = useState("")
    const [payerAndAddress, setPayerAndAddress] = useState("")
    const [bankAccountNumber, setBankAccountNumber] = useState("")

    const updateHandler = () => {
        startTransition(() => {
            if (
                (
                    organization ||
                    payerAndAddress ||
                    bankAccountNumber
                ) === ""
            ) {
                toast.error("Заполните поля!")
                return
            }

            updateUserById(
                user?.id!,
                organization,
                payerAndAddress,
                bankAccountNumber
            ).then(() => {
                toast.success("Профиль изменен")
                router.refresh()
            }).catch(() => {
                toast.error("Что-то пошло не так!")
            })
        })
    }


    return (
        <Container>
            <div
                className="flex flex-col justify-center items-center my-20 p-10 w-full bg-white drop-shadow-md rounded-xl">
                <div className="font-bold text-2xl">
                    Профиль
                </div>
                <div className="text-neutral-500 text-lg">
                    Измените информацию о себе
                </div>
                <div className="w-1/2 mt-5">
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Имя
                        </div>
                        <Input
                            disabled={true}
                            value={name}
                            onChange={(i) => {
                                setName(i.target.value)
                            }}
                            placeholder="Введите ваше полное имя"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Почта
                        </div>
                        <Input
                            disabled={true}
                            value={email}
                            onChange={(i) => {
                                setEmail(i.target.value)
                            }}
                            placeholder="Введите вашу электронную почту"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Организация ({user?.organization!})
                        </div>
                        <Input
                            disabled={isPending}
                            value={organization}
                            onChange={(i) => {
                                setOrganization(i.target.value)
                            }}
                            placeholder="Введите полное название вашей организации"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Плательщик и адрес ({user?.payerAndAddress!})
                        </div>
                        <Textarea
                            disabled={isPending}
                            value={payerAndAddress}
                            onChange={(i) => {
                                setPayerAndAddress(i.target.value)
                            }}
                            placeholder="Укажите полное имя плательщика и его адрес"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Номер счета и банк ({user?.bankAccountNumber})
                        </div>
                        <Input
                            disabled={isPending}
                            value={bankAccountNumber}
                            onChange={(i) => {
                                setBankAccountNumber(i.target.value)
                            }}
                            placeholder="Введите номер счета и полное название банка"
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