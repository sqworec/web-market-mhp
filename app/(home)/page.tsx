import {getProducts} from "@/actions/get-products";
import * as React from "react"

const HomePage = async () => {

    const products = await getProducts()

    return (
        <>
        </>
    );
}

export default HomePage;