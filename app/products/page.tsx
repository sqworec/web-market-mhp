import {getProducts} from "@/actions/get-products";
import * as React from "react"
import Container from "@/app/container";

import ProductCard from "@/components/ui/product-card";
import ProductList from "@/app/products/_components/product-list";

const ProductsPage = async () => {

    const products = await getProducts()

    return (
        <Container>
            <ProductList
                products={products!}
            />
        </Container>
    );
}

export default ProductsPage;