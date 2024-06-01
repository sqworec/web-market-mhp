import Link from "next/link";

export default function Footer() {
    return (
        <div className="text-neutral-400 w-full bg-neutral-100 h-20 flex mx-auto justify-around items-center space-x-4">
            <div>Copyright © 2024 Разработан Шпаком Антоном Ивановичем</div>
            <Link href={"/help"}>
                <div className="underline">Справка</div>
            </Link>
        </div>)
}