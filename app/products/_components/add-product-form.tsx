"use client"

import Container from "@/app/container";
import {Input} from "@/components/ui/input";
import {useEffect, useState, useTransition} from "react";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {createProduct, createProductTransaction} from "@/lib/services/product-service";
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

export default function AddProductForm() {
    const [title, setTitle] = useState("")
    const [proteins, setProteins] = useState("")
    const [fats, setFats] = useState("")
    const [carbohydrates, setCarbohydrates] = useState("")
    const [energyValue, setEnergyValue] = useState("")
    const [storageConditions, setStorageConditions] = useState("")
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")

    const [isPending, startTransition] = useTransition()

    const user = useCurrentUser()
    const router = useRouter()

    useEffect(() => {
        if (user?.role !== "ADMIN") router.push("/products")
    }, [user?.role, router]);

    if (user?.role !== "ADMIN") return null
    const addHandler = () => {
        startTransition(() => {
            if (
                (
                    title ||
                    price ||
                    category ||
                    proteins ||
                    fats ||
                    carbohydrates ||
                    energyValue ||
                    storageConditions ||
                    description
                ) === ""
            ) {
                toast.error("Заполните поля!")
                return
            }

            if (imgUrl === "") {
                toast.error("Загрузите изображение!")
                return
            }

            createProductTransaction(
                title,
                price,
                category,
                proteins,
                fats,
                carbohydrates,
                energyValue,
                storageConditions,
                description,
                imgUrl
            ).then(() => {
                toast.success("Продукт добавлен")
                setTitle("")
                setProteins("")
                setFats("")
                setCarbohydrates("")
                setEnergyValue("")
                setStorageConditions("")
                setDescription("")
                setImgUrl("")
                setPrice("")
                setCategory("")
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
                    Добавьте новую продукцию
                </div>
                <div className="text-neutral-500 text-lg">
                    Укажите подробную информацию о товаре
                </div>
                <div className="w-1/2 mt-5">
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Название
                        </div>
                        <Input
                            disabled={isPending}
                            value={title}
                            onChange={(i) => {
                                if (parseFloat(i.target.value) < 0) setTitle("0")
                                else setTitle(i.target.value)
                            }}
                            placeholder="Введите полное название продукта"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Категория
                        </div>
                        <Select
                            disabled={isPending}
                            onValueChange={(i) => {
                                setCategory(i.valueOf())
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите категорию"/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((component) => (
                                    <SelectItem
                                        key={component.title + "Add"}
                                        value={component.title}
                                    >
                                        {component.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Separator className="my-10"/>
                    <div className="text-xl font-bold">
                        Пищевая ценность (100г)
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Белки
                        </div>
                        <Input
                            disabled={isPending}
                            type={"number"}
                            value={proteins}
                            onChange={(i) => {
                                if (parseFloat(i.target.value) < 0) setProteins("0")
                                else setProteins(i.target.value)
                            }}
                            placeholder="Введите количество белков в продукте"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Жиры
                        </div>
                        <Input
                            disabled={isPending}
                            type={"number"}
                            value={fats}
                            onChange={(i) => {
                                if (parseFloat(i.target.value) < 0) setFats("0")
                                else setFats(i.target.value)
                            }}
                            placeholder="Введите количество жиров в продукте"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Углеводы
                        </div>
                        <Input
                            disabled={isPending}
                            type={"number"}
                            value={carbohydrates}
                            onChange={(i) => {
                                if (parseFloat(i.target.value) < 0) setCarbohydrates("0")
                                else setCarbohydrates(i.target.value)
                            }}
                            placeholder="Введите количество углеводов в продукте"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Энергетическая ценность
                        </div>
                        <Input
                            disabled={isPending}
                            type={"number"}
                            value={energyValue}
                            onChange={(i) => {
                                if (parseFloat(i.target.value) < 0) setEnergyValue("0")
                                else setEnergyValue(i.target.value)
                            }}
                            placeholder="Введите количество ккал в продукте"
                        />
                    </div>
                    <Separator className="my-10"/>
                    <div className="text-xl font-bold">
                        Описание
                    </div>
                    <div className="my-5">
                        <Textarea
                            disabled={isPending}
                            value={description}
                            onChange={(i) => {
                                setDescription(i.target.value)
                            }}
                            placeholder="Опишите продукт"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Изображение
                        </div>
                        <UploadButton
                            content={{button: "Добавить файл"}}
                            appearance={{
                                button: {
                                    width: "100%",
                                    background: "black",
                                    outline: "black"
                                },
                                allowedContent: {
                                    display: "none"
                                }
                            }}
                            endpoint={"imageUploader"}
                            onClientUploadComplete={(res) => {
                                setImgUrl(res[0].url)
                                toast.success("Изображение успешно загружено")
                            }}
                            onUploadError={(error: Error) => {
                                console.log(error.message)
                                toast.error("Что-то пошло не так!")
                            }}
                        />
                    </div>
                    <Separator className="my-10"/>
                    <div className="text-xl font-bold">
                        Условия хранения
                    </div>
                    <div className="my-5">
                        <Textarea
                            disabled={isPending}
                            value={storageConditions}
                            onChange={(i) => {
                                setStorageConditions(i.target.value)
                            }}
                            placeholder="Опишите условия хранения продукта"
                        />
                    </div>
                    <Separator className="my-10"/>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Цена
                        </div>
                        <Input
                            disabled={isPending}
                            type={"number"}
                            value={price}
                            onChange={(i) => {
                                if (parseFloat(i.target.value) < 0) setPrice("0")
                                else setPrice(i.target.value)
                            }}
                            placeholder="Укажите цену продукта"
                        />
                    </div>
                    <Button
                        disabled={isPending}
                        className="w-full mt-5"
                        onClick={addHandler}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </Container>
    )
}