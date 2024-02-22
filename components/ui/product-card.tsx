import React from "react";
import {useRouter} from "next/navigation";
import {Product} from "@prisma/client";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import Link from "next/link";
interface ProductCardProps {
    data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     data,
                                                 }) => {
    return (
        <>
            <Card className="bg-white shadow-md border-none rounded-xl h-[250px]" shadow="sm" isPressable>
                <CardBody className="overflow-visible p-0">
                    <Link href={`/products/${data.id}`}>
                        <Image
                            shadow="sm"
                            width="100%"
                            alt={data.title}
                            className="w-full object-cover h-[180px] rounded-sm"
                            src={data.imgUrl}
                        />
                    </Link>
                    <p className="text-[14px] pt-3">{data.title}</p>
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b className="text-[13px] text-default-500">{data.price} BYN</b>
                </CardFooter>
            </Card>
        </>
    );
}

export default ProductCard