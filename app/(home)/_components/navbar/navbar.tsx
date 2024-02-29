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
import categories from "@/components/categories";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useCurrentUser} from "@/hooks/use-current-user";
import {logout} from "@/actions/logout";


export const Navbar = () => {
    const currentUser = useCurrentUser()
    let userAvatar = "LG"
    if (currentUser) userAvatar = (currentUser?.name![0]! + currentUser?.name![(currentUser?.name!).length - 1]!).toUpperCase()
    const handleLogOut = () => {
        logout()
    }

    return (
        <nav
            className="bg-white fixed top-0 w-full h-16 z-[49] px-2 border-b border-border/40 lg:px-4 flex justify-between items-center shadow-md">
            <div className="items-center m-0 ml-5">
                <Logo/>
            </div>
            <div className="items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href={"/products"}>
                                <NavigationMenuTrigger>Продукция</NavigationMenuTrigger>
                            </Link>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {categories.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                    {
                                        (currentUser?.role === "ADMIN") &&
                                        <ListItem
                                            key={"adm"}
                                            title={"Добавить продукцию"}
                                            href={"/products/add"}
                                        >
                                            Добавьте новую продукцию!
                                        </ListItem>
                                    }
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem> <NavigationMenuItem>
                        <Link href={"/contacts"} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Контакты
                            </NavigationMenuLink>
                        </Link>
                        <Link href={"/about"} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                О нас
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="items-center mr-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="hover:bg-black">
                            <AvatarImage src="#"/>
                            <AvatarFallback className="hover:cursor-default select-none">{userAvatar}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        {
                            (currentUser) &&
                            <>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link href={"/user/profile"}>
                                            Профиль
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={"/user/favorites"}>
                                            Избранное
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={"/user/cart"}>
                                            Корзина
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator/>
                            </>
                        }

                        {
                            (!currentUser) &&
                            <DropdownMenuItem>
                                <Link href={"/auth/login"}>
                                    Авторизация
                                </Link>
                            </DropdownMenuItem>
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