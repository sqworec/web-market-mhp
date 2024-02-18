import Input from "../components/Input";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import {SignedIn} from "@clerk/clerk-react";

export default function AddProductPage() {

    return (<SignedIn>
        <div className="isolate bg-transparent px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Новая продукция</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Укажите характеристики продукции и покажите, насколько она хороша!
                </p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <Input
                        title="Название"
                        id="title"
                    />
                    <Input
                        title="Белки"
                        id="proteins"
                        isNumeric={true}
                    />
                    <Input
                        title="Жиры"
                        id="fats"
                        isNumeric={true}
                    />
                    <Input
                        title="Углеводы"
                        id="carbohydrates"
                        isNumeric={true}
                    />
                    <Input
                        title="Энергетическая ценность (ккал)"
                        id="energyValue"
                        isNumeric={true}
                    />
                    <Input
                        title="Условия хранения"
                        id="storageConditions"
                    />
                    <TextArea
                        title="Описание"
                        id="description"
                    />
                </div>
                <Button
                    title="Добавить"
                />
            </form>
        </div>
    </SignedIn>)
}
