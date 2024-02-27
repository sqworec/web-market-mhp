import {auth} from "@/auth";

export const currentUser = async () => {
    try {
        const session = await auth();

        return session?.user;
    } catch {
        return null;
    }
}