import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'
import { getStaff, getUserInfo } from "../../user";
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { UsersFour, ReceiptX, UserCircle, Shield } from "@phosphor-icons/react"
import { Skeleton } from "@/components/ui/skeleton";

export function NavHome({ id }) {
    const select = id === 0 ? true : false;
    const navTheme = "lg:mt-3 md:-mt-32 md:ml-5 bg-gray-900 text-white p-8 group inline-flex h-10 lg:w-60 md:w-max items-center justify-center rounded-lg text-sm font-bold transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50";
    const iconTextTheme = "pl-3 hidden lg:flex";
    useEffect(() => {
        getStaff();
    }, [])
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex flex-row lg:flex-col md:flex-row md:items-center md:justify-center">
                <NavigationMenuItem>
                    <Link href="/dashboard/staff" legacyBehavior passHref>
                        <NavigationMenuLink className={`${navTheme} ${select ? 'bg-green-500' : ''}`}>
                            <UserCircle size={24} weight="bold" />
                            <span className={iconTextTheme}>MEU PERFIL STAFF</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/dashboard/staff/menu" legacyBehavior passHref>
                        <NavigationMenuLink className={navTheme}>
                            <UsersFour size={24} weight="bold" />
                            <span className={iconTextTheme}>MENU ADMINISTRATIVO</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/dashboard/staff/delations" legacyBehavior passHref>
                        <NavigationMenuLink className={navTheme}>
                            <Shield size={24} weight="bold" />
                            <span className={iconTextTheme}>PAINEL DE DENÚNCIAS</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/org" legacyBehavior passHref>
                        <NavigationMenuLink className={navTheme}>
                            <ReceiptX size={24} weight="bold" />
                            <span className={iconTextTheme}>PAINEL DE BANIMENTOS</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

