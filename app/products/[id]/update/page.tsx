import Container from "@/app/container";
import {getProductById} from "@/lib/services/product-service";
import UpdateProductForm from "@/app/products/_components/update-product-form";

export default async function UpdateProductPage({params}: { params: { id: string } }) {
    const product = await getProductById(params?.id)

    return (
        <UpdateProductForm product={product!}/>
    )
}