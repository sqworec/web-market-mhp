import React from "react";
import {Product} from "@prisma/client";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import Link from "next/link";

interface ProductCardProps {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    return (
        <>
            <Card className="bg-white shadow-sm border-none rounded-xl h-[250px] hover:drop-shadow-2xl hover:-translate-y-2 hover:scale-110 transition-all duration-300 " isPressable>
                <CardBody className="overflow-visible p-0">
                    <Link href={`/products/${product.id}`}>
                        <Image
                            shadow="sm"
                            src={product.imgUrl}
                            alt={product.title}
                            width="100%"
                            className="w-full object-cover h-[180px]"
                        />
                    </Link>
                    <p className="text-[14px] pt-3">{product.title}</p>
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b className="text-[13px] text-default-500">{product.price} BYN</b>
                </CardFooter>
            </Card>
        </>
    );
}

