"use client"

import {getProductById} from "@/lib/services/product-service";
import {Card, CardBody} from "@nextui-org/react";
import React from "react";
import Container from "@/app/container";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {useCurrentUser} from "@/hooks/use-current-user";

interface ProductPersonalCardProps {
    id: string
}

export default async function ProductPersonalCard({id}: ProductPersonalCardProps) {
    const product = await getProductById(id)
    if (!product) return null

    //const user = useCurrentUser()
    
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
                            <div className="flex flex-col justify-between">
                                <div className="flex flex-col">
                                    <div className="text-3xl font-bold">
                                        {product.title}
                                    </div>
                                    <Separator className="my-5"/>
                                    <div className="text-md text-neutral-500">
                                        {product.description}
                                    </div>
                                    <Separator className="my-5"/>
                                    <div className="text-md text-neutral-500 flex flex-col">
                                        <div>Белки: {product.proteins} г</div>
                                        <div>Жиры: {product.fats} г</div>
                                        <div>Углеводы: {product.carbohydrates} г</div>
                                        <div>Энергетическая ценность: {product.energyValue} ккал</div>
                                    </div>
                                    <Separator className="my-5"/>
                                    <div className="text-md text-neutral-500">
                                        Условия хранения: {product.storageConditions}
                                    </div>
                                </div>
                                <Button
                                    onClick={() => {}}
                                >
                                    В корзину
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}