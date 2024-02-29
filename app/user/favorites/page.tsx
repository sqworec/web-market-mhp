import Container from "@/app/container";
import {getCurrentUser} from "@/lib/services/get-current-user";
import {getFavoriteProductsByUserId} from "@/lib/services/favorites-service";
import FavoriteProductCard from "@/app/user/_components/favorite-product-card";

export default async function FavoritesPage() {
    const currentUser = await getCurrentUser()
    const products = await getFavoriteProductsByUserId(currentUser?.id!)


    return (
        <div className="mt-20">
            <Container>
                {
                    (products?.length === 0) &&
                    <div className="flex justify-center items-center  text-xl text-neutral-500">
                        В избранном пока что пусто. Добавьте сюда то, что понравилось!
                    </div>
                }

                {products
                    ?.sort((a, b) => a.id - b.id)
                    .map((product) => (
                        <FavoriteProductCard
                            favoriteProduct={product}
                            key={product.id}
                        />
                    ))}


            </Container>
        </div>
    )
} 