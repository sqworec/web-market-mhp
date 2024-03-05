import {
    addProductToFavorite,
    getFavoriteProductByProductId,
    removeProductFromFavorite
} from "@/lib/services/favorites-service";
import toast from "react-hot-toast";
import {revalidatePath} from "next/cache";

export const toggleFavorite = async (userId: string, productId: string) => {
    try {
        const isUserFavorite = await getFavoriteProductByProductId(userId, productId)

        if (!isUserFavorite) {
            await addProductToFavorite(userId, productId)
            toast.success("Добавлено в избранное")
        } else {
            await removeProductFromFavorite(userId, productId)
            toast.success("Удалено из избранного")
        }

    } catch (error) {
        toast.error("Error togging favorite: " + error)
        return null
    }
}