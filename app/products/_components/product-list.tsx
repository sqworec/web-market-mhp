"use client"

import ProductCard from "@/components/ui/product-card";
import * as React from "react";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import NoResults from "@/app/products/_components/no-results";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");
    const titleParam = searchParams.get("title");
    let filteredProducts = products;

    if (categoryParam && filteredProducts) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryParam);
    }

    if (titleParam && filteredProducts) {
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(titleParam.toLowerCase()));
    }

    return (
        <div className="mb-20">
            {(filteredProducts.length > 0) ? (
                <div className="
                    pt-20
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
                <NoResults />
            )}
        </div>
    );
}
