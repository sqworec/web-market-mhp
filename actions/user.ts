import {db} from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = db.user.findUnique({where: {email}})
        return user
    } catch {
        return null
    }
}