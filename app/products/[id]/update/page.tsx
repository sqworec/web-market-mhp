import Container from "@/app/container";
import {getProductById} from "@/lib/services/product-service";
import UpdateProductForm from "@/app/products/_components/update-product-form";
import NoProduct from "@/app/products/_components/no-product";

export default async function UpdateProductPage({params}: { params: { id: string } }) {
    const product = await getProductById(params?.id)

    if (!product)
        return <NoProduct/>

    return (
        <UpdateProductForm product={product!}/>
    )
}