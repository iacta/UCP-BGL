import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator"
import { List } from "@phosphor-icons/react";
import Link from "next/link";

export function Menu() {
    return (
        <div className="absolute pl-6 pt-14">
            <Sheet>
                <SheetTrigger>
                    <List size={32} weight="bold" />
                </SheetTrigger>
                <SheetContent side="left" className="bg-gray-950 w-48">
                    <SheetHeader className="">
                        <SheetTitle className="text-white pt-5">Inicio</SheetTitle>
                        <SheetDescription>
                            <NavIndice />
                            <Separator className="my-4 bg-gray-400 mt-10 w-36 -ml-5"/>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}


const navtheme = "text-white font-bold group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-green-700 data-[state=open]:bg-green-700";

export function NavIndice() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex-col items-baseline">
                <NavigationMenuItem>
                    <Link href="/dashboard" legacyBehavior passHref>
                        <NavigationMenuLink className={navtheme}>
                            <House size={24} weight="bold" /> HOME
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/user" legacyBehavior passHref>
                        <NavigationMenuLink className={navtheme}>
                            <UserCircle size={24} weight="bold" /> MEU PERFIL
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/org" legacyBehavior passHref>
                        <NavigationMenuLink className={navtheme}>
                            <Sword size={24} weight="bold" /> ORGANIZAÇÃO
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/family" legacyBehavior passHref>
                        <NavigationMenuLink className={navtheme}>
                            <UsersFour size={24} weight="bold" /> MINHA FAMÍLIA
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
}
