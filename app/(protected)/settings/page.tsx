import {auth} from "@/auth";

const SettingsPage = async () => {
    const session = await auth()
    return (
        <div className="flex justify-around mt-[20%] text-lg">
            {JSON.stringify(session)}
        </div>
    )
}

export default SettingsPage