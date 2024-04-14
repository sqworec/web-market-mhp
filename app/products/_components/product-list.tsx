"use client"

import ProductCard from "@/components/ui/product-card";
import * as React from "react";
import {Product} from "@prisma/client";
import {useSearchParams} from "next/navigation";
import NoResults from "@/app/products/_components/no-results";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import categories from "@/data/categories";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({products}: ProductListProps) {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");
    const titleParam = searchParams.get("title");
    const [sort, setSort] = useState("А-Я")

    let filteredProducts = products;

    if (categoryParam && filteredProducts) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryParam);
    }

    if (titleParam && filteredProducts) {
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(titleParam.toLowerCase()));
    }

    if (sort === "А-Я") {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
    } else if (sort === "Я-А") {
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
    } else if (sort === "Дорогой") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "Дешевый") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    return (
        <div className="mb-20">
            <div className="mt-20">
                <Select
                    onValueChange={(i) => {
                        setSort(i.valueOf())
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={sort}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            key={"А-Я"}
                            value={"А-Я"}
                        >
                            А-Я
                        </SelectItem>
                        <SelectItem
                            key={"Я-А"}
                            value={"Я-А"}
                        >
                            Я-А
                        </SelectItem>
                        <SelectItem
                            key={"Дорогой"}
                            value={"Дорогой"}
                        >
                            Дорогой
                        </SelectItem>
                        <SelectItem
                            key={"Дешевый"}
                            value={"Дешевый"}
                        >
                            Дешевый
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {(filteredProducts.length > 0) ? (
                <div className="
                    mt-8
                    grid
                    grid-cols-1
                    sm:grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    2xl:grid-cols-5
                    gap-8
                    justify-between
                ">

                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <NoResults/>
            )}
        </div>
    );
}
