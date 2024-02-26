import {getProductById} from "@/lib/services/product-service";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import React from "react";
import Container from "@/app/container";

interface ProductPersonalCardProps {
    id: string
}

export default async function ProductPersonalCard({id}: ProductPersonalCardProps) {
    const product = await getProductById(id)
    if (!product) return null

    return (
        <>
            <Container>
                <Card className="bg-white shadow-md border-none rounded-xl w-full px-10 pb-5 mt-20" shadow="sm">
                    <CardBody className="mb-4 pt-12">
                        <div className="grid grid-cols-2">
                            <div>
                                <div>
                                    <img
                                        src={product.imgUrl}
                                        alt={product.title}
                                        className="w-[750px] h-[550px] rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-3xl font-bold mb-5">
                                    {product.title}
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className="text-lg">
                                        Описание:
                                    </div>
                                    <div className="text-md text-neutral-500">
                                        {product.description}
                                    </div>
                                </div>
                                <p>Белки: {product.proteins}</p>
                                <p>Жиры: {product.fats}</p>
                                <p>Углеводы: {product.carbohydrates}</p>
                                <p>Энергетическая ценность: {product.energyValue} ккал</p>
                                <p>Условия хранения: {product.storageConditions}</p>
                            </div>
                        </div>
                    </CardBody>

                </Card>
            </Container>
        </>
    )
}