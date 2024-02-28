import Container from "@/app/container";
import {getCurrentUser} from "@/lib/services/get-current-user";
import {getFavoriteProductsByUserId} from "@/lib/services/favorites-service";
import FavoriteProductCard from "@/app/user/favorite-product-card";

export default async function FavoritesPage() {
    const currentUser = await getCurrentUser()
    const products = await getFavoriteProductsByUserId(currentUser?.id!)

    return (
        <div className="mt-20">
            <Container>
                {products?.map((product) => (
                    <FavoriteProductCard
                        favoriteProduct={product}
                        key={product.id}
                    />
                ))}

                {
                    (!products) &&
                    <div>
                        Пусто
                    </div>
                }
            </Container>
        </div>
    )
} 