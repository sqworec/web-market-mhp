import {getProducts} from "@/actions/get-products";
import * as React from "react"
import Container from "@/app/container";

import ProductCard from "@/components/ui/product-card";
import ProductsList from "@/app/products/_components/products-list";

const ProductsPage = async () => {

    const products = await getProducts()

    return (
        <Container>
            <ProductsList
                products={products!}
            />
        </Container>
    );
}

export default ProductsPage;