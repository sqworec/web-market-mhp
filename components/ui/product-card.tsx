'use client'

import React from "react";
import {useRouter} from "next/navigation";
import {Product} from "@prisma/client";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
interface ProductCardProps {
    data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     data,
                                                 }) => {
    const router = useRouter()
    return (
        <>
            <Card className="shadow-lg border-2 border-neutral-200 rounded-xl" shadow="sm" isPressable onPress={() => router.push(`/products/${data.id}`)}>
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={data.title}
                        className="w-full object-cover h-[140px]"
                        src={data.imgUrl}
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <p className="text-[14px]">{data.title}</p>
                    <b className="text-[13px] text-default-500">{data.price} BYN</b>
                </CardFooter>
            </Card>
        </>
    );
}

export default ProductCard