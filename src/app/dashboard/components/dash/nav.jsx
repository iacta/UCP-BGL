import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    UsersFour, Sword, UserCircle, House, ShoppingCart,
    CaretLeft, Gavel, Shield, Bell, SignOut
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import {
    NavigationMenu, NavigationMenuContent, NavigationMenuIndicator,
    NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
    NavigationMenuTrigger, NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getUserInfo, logout } from "../../user";
import { Skeleton } from "@/components/ui/skeleton";

export function Nav() {
    const navTheme = "group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-green-700 data-[state=open]:bg-green-700";
    const iconTextTheme = "pl-3";
    const [user, setUser] = useState(null);
    const [staff, setStaff] = useState(false);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userInfo = await getUserInfo();
                setUser(userInfo);
                if (userInfo.staff) setStaff(true);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchUserInfo();
    }, []);

    if (!user) {
        return (
            <>
                <div className="absolute left-20 -mt-40">
                    <img src="/bgl.png" alt="Logo" className="h-52 w-64" />
                </div>
                <div className="flex justify-center items-center ml-10 mt-32 bg-gray-900 w-10/12 p-1 rounded-md">
                    <NavigationMenu className="flex-grow">
                        <NavigationMenuList className="flex space-x-2">
                            <Skeleton className="h-10 w-[900px] bg-gray-600" />
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="absolute left-20 -mt-40">
                <img src="/bgl.png" alt="Logo" className="h-52 w-64" />
            </div>
            <div className="hidden lg:flex lg:flex-grow lg:justify-center lg:items-center mt-32  w-screen rounded-lg">
                <div className="w-max flex justify-center bg-gray-900 p-2">
                    <NavigationMenu className="flex-grow max-w-6xl mx-auto">
                        <NavigationMenuList className="flex justify-center space-x-5">
                            {[
                                { href: "/dashboard", icon: <House size={24} weight="bold" />, label: "Home" },
                                { href: "/dashboard/loja", icon: <ShoppingCart size={24} weight="bold" color="#0CFF00" />, label: "Loja do Servidor" },
                                { href: "/dashboard/denuncias", icon: <Gavel size={24} weight="bold" color="#FF0000" />, label: "Denúncias", className: "hover:bg-red-500 focus:bg-red-600 data-[active]:bg-red-700 data-[state=open]:bg-red-700" },
                                { href: "/dashboard/revisao", icon: <Shield size={24} weight="bold" color="#FF8000" />, label: "Minhas Revisões", className: "hover:bg-amber-500 focus:bg-amber-600 data-[active]:bg-amber-700 data-[state=open]:bg-amber-700" },
                                staff && { href: "/dashboard/staff", icon: <Shield size={24} weight="bold" color="#FF1493" />, label: "Menu Administrativo", className: "hover:bg-rose-600 focus:bg-rose-600 data-[active]:bg-rose-700 data-[state=open]:bg-rose-700" },
                            ].filter(Boolean).map(({ href, icon, label, className }) => (
                                <NavigationMenuItem key={href}>
                                    <Link href={href} legacyBehavior passHref>
                                        <NavigationMenuLink className={`${navTheme} ${className}`}>
                                            {icon} <span className={iconTextTheme}>{label}</span>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center ml-15">
                        <Notify />
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="flex items-center space-x-2 pr-5">
                                    <div className="w-14 h-14 overflow-hidden rounded-full border-none bg-gray-700">
                                        <img src={`https://assets.open.mp/assets/images/skins/${user.skinID}.png`} alt="Avatar" className="object-cover object-top w-full h-full" />
                                    </div>
                                    <CaretLeft size={24} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-950 border-none text-white">
                                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Online: não</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="data-[active]:bg-red-600 data-[state=open]:bg-red-600">
                                    <SignOut size={25} />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="md:hidden z-50 fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900 p-2 flex justify-center items-center space-x-4 rounded-t-lg shadow-lg w-11/12 max-w-md">                <NavigationMenu className="flex-grow">
                <NavigationMenuList className="flex justify-center space-x-4">
                    {[
                        { href: "/dashboard", icon: <House size={24} weight="bold" /> },
                        { href: "/dashboard/loja", icon: <ShoppingCart size={24} weight="bold" color="#0CFF00" /> },
                        { href: "/dashboard/denuncias", icon: <Gavel size={24} weight="bold" color="#FF0000" />, className: "hover:bg-red-500 focus:bg-red-600 data-[active]:bg-red-700 data-[state=open]:bg-red-700" },
                        { href: "/dashboard/revisao", icon: <Shield size={24} weight="bold" color="#FF8000" />, className: "hover:bg-amber-500 focus:bg-amber-600 data-[active]:bg-amber-700 data-[state=open]:bg-amber-700" },
                        staff && { href: "/dashboard/staff", icon: <Shield size={24} weight="bold" color="#FF1493" />, className: "hover:bg-rose-600 focus:bg-rose-600 data-[active]:bg-rose-700 data-[state=open]:bg-rose-700" },
                    ].filter(Boolean).map(({ href, icon, className }) => (
                        <NavigationMenuItem key={href}>
                            <Link href={href} legacyBehavior passHref>
                                <NavigationMenuLink className={`${navTheme} ${className}`}>
                                    {icon}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center">
                            <img
                                src={`https://assets.open.mp/assets/images/skins/${user.skinID}.png`}
                                alt="Avatar"
                                className="w-10 h-10 bg-gray-700 rounded-full object-cover object-top mr-2"
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-950 border-none text-white">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Online: não</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="data-[active]:bg-red-600 data-[state=open]:bg-red-600">
                            <SignOut size={25} />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center">
                    <Notify />
                </div>
            </div>
        </>
    );
}

export function Notify() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="bg-gray-900 border-none hover:bg-green-500 mr-5">
                    <Bell size={24} weight="bold" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-gray-950 text-white">
                <h1 className="font-bold text-lg">Suas notificações ficam aqui</h1>
                <p className="text-base pt-5 text-gray-600 font-semibold">Você não tem novas notificações</p>
            </PopoverContent>
        </Popover>
    );
}

export function NavHome({ id }) {
    const defaultNavTheme = "mt-3 bg-green-500 text-white p-8 group inline-flex h-10 w-52 items-center justify-center rounded-lg text-sm font-bold transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-green-700 data-[state=open]:bg-green-700";
    const navTheme = "mt-3 bg-gray-900 text-white p-8 group inline-flex h-10 w-52 items-center justify-center rounded-lg text-sm font-bold transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-green-700 data-[state=open]:bg-green-700";
    const iconTextTheme = "pl-3";

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex flex-col justify-center items-center">
                {[
                    { href: "/user", icon: <UserCircle size={24} weight="bold" />, label: "MEU PERFIL", id: 0 },
                    { href: "/org", icon: <Sword size={24} weight="bold" />, label: "ORGANIZAÇÃO" },
                    { href: "/family", icon: <UsersFour size={24} weight="bold" />, label: "MINHA FAMÍLIA" },
                ].map(({ href, icon, label, id: linkId }) => (
                    <NavigationMenuItem key={href}>
                        <Link href={href} legacyBehavior passHref>
                            <NavigationMenuLink className={id === linkId ? defaultNavTheme : navTheme}>
                                {icon} <span className={iconTextTheme}>{label}</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
