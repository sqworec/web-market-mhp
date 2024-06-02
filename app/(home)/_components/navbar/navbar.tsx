"use client"

import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu"
import Link from "next/link";
import * as React from "react";
import categories from "@/data/categories";
import {cn} from "@/lib/utils";
import Logo from "@/app/(home)/_components/navbar/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,

} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useCurrentUser} from "@/hooks/use-current-user";
import {logout} from "@/actions/logout";
import toast from "react-hot-toast";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SearchIcon} from "@nextui-org/shared-icons";


export const Navbar = () => {
    const currentUser = useCurrentUser()
    const [searchInput, setSearchInput] = useState("")

    const router = useRouter()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    let userAvatar = "LG"
    if (currentUser) userAvatar = (currentUser?.name![0]! + currentUser?.name![(currentUser?.name!).length - 1]!).toUpperCase()
    const handleLogOut = () => {
        logout().then(() => {
            toast.success("Вы вышли из аккаунта")
        })
    }


    return (
        <nav
            className="bg-white fixed top-0 w-full h-16 z-[49] border-b border-border/40 flex justify-between items-center shadow-md sm:px-10 lg:px-20">
            <div className="items-center m-0">
                <Logo/>
            </div>
            <div className="items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href={"/"} legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Главная
                                </NavigationMenuLink>
                            </Link>
                            <Link href={"/products"}>
                                <NavigationMenuTrigger
                                    className="ml-1"
                                >
                                    Продукция
                                </NavigationMenuTrigger>
                            </Link>
                            <NavigationMenuContent>
                                <div className="flex flex-row justify-between w-[94.5%] mt-4 ml-4">
                                    <Input
                                        className="w-[90%]"
                                        placeholder="Поиск"
                                        value={searchInput}
                                        onChange={(e) => {
                                            setSearchInput(e.target.value)
                                        }}
                                    />
                                    <Button
                                        onClick={() => {
                                            router.push("/products?" + createQueryString("title", searchInput))
                                        }}
                                    >
                                        <SearchIcon/>
                                    </Button>
                                </div>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    <ListItem
                                        key={"allProducts"}
                                        title={"Вся продукция"}
                                        href={"/products"}
                                    >
                                        Все
                                    </ListItem>
                                    {categories.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            onClick={() => {
                                                router.push("/products?" + createQueryString("category", component.searchParam))
                                            }}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                    {
                                        (currentUser?.role === "ADMIN") &&
                                        <ListItem
                                            key={"admin"}
                                            title={"Добавить продукцию"}
                                            href={"/products/add"}
                                        >
                                            Добавьте новую продукцию!
                                        </ListItem>
                                    }
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem> <NavigationMenuItem>
                        <Link href={"/about"} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                О нас
                            </NavigationMenuLink>
                        </Link>
                        {/*<Link href={"/help"} legacyBehavior passHref>*/}
                        {/*    <NavigationMenuLink className={navigationMenuTriggerStyle() + " ml-1"}>*/}
                        {/*        Справка*/}
                        {/*    </NavigationMenuLink>*/}
                        {/*</Link>*/}
                    </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="hover:bg-black">
                            <AvatarImage src="#"/>
                            <AvatarFallback className="hover:cursor-default select-none">{userAvatar}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {
                            (currentUser) &&
                            <>
                                <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                            </>
                        }
                        {
                            (currentUser) &&
                            <>
                                <DropdownMenuGroup>
                                    {
                                        (currentUser?.role === "USER") &&
                                        <>
                                            <Link href={"/user/profile"}>
                                                <DropdownMenuItem>
                                                    Профиль
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={"/user/favorites"}>
                                                <DropdownMenuItem>
                                                    Избранное
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={"/user/cart"}>
                                                <DropdownMenuItem>
                                                    Корзина
                                                </DropdownMenuItem>
                                            </Link>
                                        </>

                                    }
                                    <Link href={"/user/orders"}>
                                        <DropdownMenuItem>
                                            Заказы
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator/>
                            </>
                        }

                        {
                            (!currentUser) &&
                            <Link href={"/auth/login"}>
                                <DropdownMenuItem>
                                    Авторизация
                                </DropdownMenuItem>
                            </Link>
                        }

                        {
                            (currentUser) &&
                            <DropdownMenuItem onClick={handleLogOut} className="text-red-500">
                                Выйти
                            </DropdownMenuItem>

                        }

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Navbar;