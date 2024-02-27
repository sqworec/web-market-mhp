import {getProducts} from "@/actions/get-products";
import * as React from "react"
import Container from "@/app/container";

import ProductCard from "@/components/ui/product-card";

const ProductsPage = async () => {

    const products = await getProducts()

    return (
        <>
            <Container>
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
                    {products?.map((product) => (
                        <ProductCard
                            key={product.id}
                            data={product}
                        />
                    ))}
                </div>
            </Container>
        </>
    );
}

export default ProductsPage;