import Container from "@/app/container";
import {AddToCartForm} from "@/app/products/_components/add-to-cart";
import {AddToFavoritesButton} from "@/app/products/_components/add-to-favorites";
import {getCurrentUser} from "@/lib/services/get-current-user";
import {getProductById} from "@/lib/services/product-service";
import DeleteProductButton from "@/app/products/_components/delete-product-button";
import {Separator} from "@/components/ui/separator";
import UpdateProductButton from "@/app/products/_components/update-product-button";

export default async function ProductPage({params}: { params: { id: string } }) {
    const user = await getCurrentUser()
    const product = await getProductById(params.id)

    return (
        <div className="my-20">
            <Container>
                <div className="w-full h-full rounded-xl drop-shadow-md bg-white flex flex-col">
                    <div
                        className="flex flex-row"
                    >
                        <div className="relative w-[50%] h-[52vh]">
                            <img
                                className="
                                    absolute
                                    rounded-xl
                                    object-cover
                                    w-full
                                    h-full
                                    top-0
                                    left-0
                                "
                                src={product?.imgUrl!}
                                alt={product?.title!}
                            />
                        </div>
                        <div
                            className="
                                    flex
                                    flex-col
                                    mt-[2vh]
                                    ml-[2vw]
                                    w-1/2
                                "
                        >
                            <div className="xl:text-2xl md:text-xl font-bold">
                                {product?.title}
                            </div>
                            <div className="xl:text-lg md:text-sm text-neutral-500">
                                {product?.category}
                            </div>
                            <Separator className="my-[2vh]"/>
                            <div className="xl:text-xl md:text-lg font-bold mb-[1vh]">
                                Пищевая ценность (100г)
                            </div>
                            <div className="text-neutral-500 xl:text-lg md:text-sm flex flex-col">
                                <div>Белки: {product?.proteins} г</div>
                                <div>Жиры: {product?.fats} г</div>
                                <div>Углеводы: {product?.carbohydrates} г</div>
                                <div>Энергетическая ценность: {product?.energyValue} ккал</div>
                            </div>
                            <Separator className="my-[2vh]"/>
                            <div className="xl:text-xl md:text-lg font-bold mb-[1vh]">
                                Описание:
                            </div>
                            <div className="text-neutral-500 xl:text-lg md:text-sm flex flex-col">
                                {product?.description}
                            </div>
                            <Separator className="my-[2vh]"/>
                            <div className="xl:text-xl md:text-lg font-bold mb-[1vh]">
                                Условия хранения:
                            </div>
                            <div className="text-neutral-500 xl:text-lg md:text-sm flex flex-col">
                                {product?.storageConditions}
                            </div>
                            <Separator className="my-[2vh]"/>
                        </div>
                    </div>
                    <div className="px-[5vw] pb-[5vh] mt-[2vh]">
                        <AddToCartForm
                            userId={user?.id!}
                            productId={params?.id}
                        />
                        <AddToFavoritesButton
                            userId={user?.id!}
                            productId={params?.id}
                        />

                        {
                            (user?.role === "ADMIN") &&
                            <>
                                <UpdateProductButton
                                    productId={params?.id}
                                />
                                <DeleteProductButton
                                    productId={params?.id}
                                />
                            </>
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}