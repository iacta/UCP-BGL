import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { UsersFour, ReceiptX, UserCircle, House } from "@phosphor-icons/react"


export function NavHome({ id }) {
    const defaultNavTheme = "mt-3 bg-green-500 text-white p-8 group inline-flex h-10 w-52 items-center justify-center rounded-lg text-sm font-bold transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-green-700 data-[state=open]:bg-green-700";
    const navTheme = "mt-3 bg-gray-900 text-white p-8 group inline-flex h-10 w-54 items-center justify-center rounded-lg text-sm font-bold transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-green-700 data-[state=open]:bg-green-700";
    const iconTextTheme = "pl-3";

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex flex-col">
                <NavigationMenuItem>
                    <Link href="/user" legacyBehavior passHref>
                        <NavigationMenuLink className={navTheme}>
                            <UserCircle size={24} weight="bold" />
                            <span className={iconTextTheme}>PAINEL DE DENÚNCIAS</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/org" legacyBehavior passHref>
                        <NavigationMenuLink className={navTheme}>
                            <ReceiptX  size={24} weight="bold" />
                            <span className={iconTextTheme}>PAINEL DE BANIMENTOS</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/family" legacyBehavior passHref>
                        <NavigationMenuLink className={navTheme}>
                            <UsersFour size={24} weight="bold" />
                            <span className={iconTextTheme}>MENU ADMINISTRATIVO</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
