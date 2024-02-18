import { SignOutButton } from "@clerk/clerk-react";

export default function SignOutBtn() {
    return (
        <div>
            <SignOutButton>
                <button
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Выйти
                </button>
            </SignOutButton>
        </div>
    );
}