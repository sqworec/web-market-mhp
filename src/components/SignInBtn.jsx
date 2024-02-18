import { SignInButton } from "@clerk/clerk-react";

export default function SignInBtn() {
    return (
        <div>
            <SignInButton>
                <button
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Авторизация
                </button>
            </SignInButton>
        </div>
    );
}