"use client"

import Container from "@/app/container";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {createProduct} from "@/lib/services/product-service";
import toast from "react-hot-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import categories from "@/components/categories";
import {UploadButton} from "@/utils/uploadthing";

export default function AddProductPage() {
    const [title, setTitle] = useState("")
    const [proteins, setProteins] = useState("")
    const [fats, setFats] = useState("")
    const [carbohydrates, setCarbohydrates] = useState("")
    const [energyValue, setEnergyValue] = useState("")
    const [storageConditions, setStorageConditions] = useState("")
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("asdf")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")

    const addHandler = () => {
        createProduct(
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
                            value={title}
                            onChange={(i) => {
                                setTitle(i.target.value)
                            }}
                            placeholder="Введите полное название продукта"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Категория
                        </div>
                        <Select
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
                            type={"number"}
                            value={proteins}
                            onChange={(i) => {
                                setProteins(i.target.value)
                            }}
                            placeholder="Введите количество белков в продукте"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Жиры
                        </div>
                        <Input
                            type={"number"}
                            value={fats}
                            onChange={(i) => {
                                setFats(i.target.value)
                            }}
                            placeholder="Введите количество жиров в продукте"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Углеводы
                        </div>
                        <Input
                            type={"number"}
                            value={carbohydrates}
                            onChange={(i) => {
                                setCarbohydrates(i.target.value)
                            }}
                            placeholder="Введите количество углеводов в продукте"
                        />
                    </div>
                    <div className="my-5">
                        <div className="font-bold mb-2">
                            Энергетическая ценность
                        </div>
                        <Input
                            type={"number"}
                            value={energyValue}
                            onChange={(i) => {
                                setEnergyValue(i.target.value)
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
                                //setImgUrl( res[0].url)
                                toast.success("Изображение успешно загружено")
                                console.log(res[0].url)
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
                            type={"number"}
                            value={price}
                            onChange={(i) => {
                                setPrice(i.target.value)
                            }}
                            placeholder="Укажите цену продукта"
                        />
                    </div>
                    <Button
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