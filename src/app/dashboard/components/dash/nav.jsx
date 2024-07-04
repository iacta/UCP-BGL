import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
    UsersFour,
    Sword,
    UserCircle,
    House,
    ShoppingCart,
    CaretLeft,
    CaretDown,
    Gavel,
    Shield,
    Bell,
    PersonSimpleSnowboard
} from "@phosphor-icons/react"
import React, { useEffect, useState } from "react";
import { User } from "@phosphor-icons/react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Separator } from "@/components/ui/separator"

import { SignOut } from "@phosphor-icons/react";
import { getUserInfo, logout } from '../../user';
import { CircularProgress } from './circularprogress';
import { Skeleton } from "@/components/ui/skeleton"


export function Nav() {
    const navtheme = "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-green-700 data-[state=open]:bg-green-700"
    const iconTextTheme = "pl-3"
    const [user, setUser] = useState(null)
    const [staff, setStaff] = useState(false)

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userInfo = await getUserInfo()
                setUser(userInfo)
                if (userInfo.staff) setStaff(true)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchUserInfo()
    }, [])

    if (!user) {
        return (
            <>
                <div className="absolute left-20 -mt-40">
                    <img src="/bgl.png" alt="Logo" className="h-52 w-64" />
                </div>
                <div className="flex flex-grow flex-row ml-10 mt-32 bg-gray-900 w-10/12 p-1 rounded-md">
                    <NavigationMenu className="flex-grow">
                        <NavigationMenuList className="flex space-x-2">
                            <Skeleton className="h-10 w-[900px] bg-gray-600" />
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="absolute left-20 -mt-40">
                <img src="/bgl.png" alt="Logo" className="h-52 w-64" />
            </div>
            <div className="hidden md:flex md:flex-grow md:flex-row ml-10 mt-32 bg-gray-900 w-10/12 p-1 rounded-lg">
                <NavigationMenu className="flex-grow">
                    <NavigationMenuList className="flex space-x-2">
                        <NavigationMenuItem>
                            <Link href="/dashboard" legacyBehavior passHref>
                                <NavigationMenuLink className={navtheme}>
                                    <House size={24} weight="bold" /> <span className={iconTextTheme}>Home</span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/dashboard/loja" legacyBehavior passHref>
                                <NavigationMenuLink className={navtheme}>
                                    <ShoppingCart size={24} weight="bold" color="#0CFF00" />  <span className={iconTextTheme}>Loja do Servidor</span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/dashboard/denuncias" legacyBehavior passHref>
                                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-red-500 hover:text-white focus:bg-red-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-red-700 data-[state=open]:bg-red-700">
                                    <Gavel size={24} weight="bold" color="#FF0000" />  <span className={iconTextTheme}>Denúncias</span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/dashboard/revisao" legacyBehavior passHref>
                                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-amber-500 hover:text-white focus:bg-amber-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-amber-700 data-[state=open]:bg-amber-700">
                                    <Shield size={24} weight="bold" color="#FF8000" />  <span className={iconTextTheme}>Minhas Revisões</span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            {staff && (
                                <Link href="/dashboard/staff" legacyBehavior passHref>
                                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-rose-600 hover:text-white focus:bg-rose-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-rose-700 data-[state=open]:bg-rose-700">
                                        <Shield size={24} weight="bold" color="#FF1493" />
                                        <span className={iconTextTheme}>Menu Administrativo</span>
                                    </NavigationMenuLink>
                                </Link>
                            )}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center ml-auto">
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
                            <DropdownMenuItem onClick={() => logout()} className="data-[active]:bg-red-600 data-[state=open]:bg-red-600">
                                <SignOut size={25} />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>


            <div className="md:hidden z-50 fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900 p-2 flex justify-center items-center space-x-4 rounded-t-lg shadow-lg w-11/12 max-w-md">
                <NavigationMenu className="flex-grow">
                    <NavigationMenuList className="flex">
                        <NavigationMenuItem>
                            <Link href="/dashboard" legacyBehavior passHref>
                                <NavigationMenuLink className={navtheme}>
                                    <House size={24} weight="bold" />
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/dashboard/loja" legacyBehavior passHref>
                                <NavigationMenuLink className={navtheme}>
                                    <ShoppingCart size={24} weight="bold" color="#0CFF00" />
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/dashboard/denuncias" legacyBehavior passHref>
                                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-red-500 hover:text-white focus:bg-red-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-red-700 data-[state=open]:bg-red-700">
                                    <Gavel size={24} weight="bold" color="#FF0000" />
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/dashboard/revisao" legacyBehavior passHref>
                                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-amber-500 hover:text-white focus:bg-amber-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-amber-700 data-[state=open]:bg-amber-700">
                                    <Shield size={24} weight="bold" color="#FF8000" />
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        {staff && (
                            <Link href="/dashboard/staff" legacyBehavior passHref>
                                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-rose-600 hover:text-white focus:bg-rose-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-rose-700 data-[state=open]:bg-rose-700">
                                    <Shield size={24} weight="bold" color="#FF1493" />
                                </NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center">
                            <img src={`https://assets.open.mp/assets/images/skins/${user.skinID}.png`} alt="Avatar" className="w-10 h-10 bg-gray-700 rounded-full object-cover object-top mr-2" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 text-white">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <h1 className="pl-2 font-bold text-sm text-red-700">Online: Não</h1>
                        <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <SignOut size={25} />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center">
                    <Notify />
                </div>
            </div>
            <div className="md:hidden h-24"></div> {}

        </>
    );
}


export function Notify() {
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" size="icon" className="mr-2 bg-gray-900 border-none hover:bg-green-500">
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
            <NavigationMenuList className="flex flex-col">
                <NavigationMenuItem>
                    <Link href="/user" legacyBehavior passHref>
                        <NavigationMenuLink className={id === 0 ? defaultNavTheme : navTheme}>
                            <UserCircle size={24} weight="bold" />
                            <span className={iconTextTheme}>MEU PERFIL</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/org" legacyBehavior passHref>
                        <NavigationMenuLink className={navTheme}>
                            <Sword size={24} weight="bold" />
                            <span className={iconTextTheme}>ORGANIZAÇÃO</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/family" legacyBehavior passHref>
                        <NavigationMenuLink className={navTheme}>
                            <UsersFour size={24} weight="bold" />
                            <span className={iconTextTheme}>MINHA FAMÍLIA</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}


