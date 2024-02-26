import ProductPersonalCard from "@/app/products/product-personal-card";

export default async function ProductPage({params}: { params: { id: string } }) {
    return (
        <div>
            <ProductPersonalCard id={params.id}/>
        </div>
    )
}