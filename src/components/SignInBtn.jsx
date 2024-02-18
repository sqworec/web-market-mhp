import { SignInButton } from "@clerk/clerk-react";

export default function SignInBtn() {
    return (
        <div>
            <SignInButton>
                <button>Авторизация</button>
            </SignInButton>
        </div>
    );
}