import { SignOutButton } from "@clerk/clerk-react";

export default function SignOutBtn() {
    return (
        <div>
            <SignOutButton>
                <button>Выйти</button>
            </SignOutButton>
        </div>
    );
}