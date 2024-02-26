"use client"

import {useSession} from "next-auth/react";
import {logout} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";

const SettingsPage = () => {
    const user= useCurrentUser()

    const onClick = () => {
        logout()
    }

    return (
        <div className="flex flex-col justify-around mt-[20%] text-lg">
            {JSON.stringify(user)}
            <button
                onClick={onClick}
                type="submit"
            >
                Выйти
            </button>
        </div>
    )
}

export default SettingsPage