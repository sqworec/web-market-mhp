import {
    addProductToFavorite,
    getFavoriteProductByProductId,
    removeProductFromFavorite
} from "@/lib/services/favorites-service";
import toast from "react-hot-toast";

export const toggleFavorite = async (userId: string, productId: string) => {
    try {
        const isUserFavorite = await getFavoriteProductByProductId(userId, productId)

        if (!isUserFavorite) {
            await addProductToFavorite(userId, productId)
            toast.success("добавлено")
        } else {
            await removeProductFromFavorite(userId, productId)
            toast.success("удалено")
        }
    } catch (error) {
        toast.error("Error togging favorite: " + error)
        return null
    }
}