import {auth, signOut} from "@/auth";

const SettingsPage = async () => {
    const session = await auth()
    return (
        <div className="flex justify-around mt-[20%] text-lg">
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"

                await signOut()
            }}>
                <button type="submit">
                    Выйти
                </button>
            </form>
        </div>
    )
}

export default SettingsPage