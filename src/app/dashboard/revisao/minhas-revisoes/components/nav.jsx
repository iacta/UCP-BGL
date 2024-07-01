import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ArrowLeft } from "@phosphor-icons/react"


export function NavHome({ id }) {
    const select = id === 0 ? true : false;
    const navTheme = "lg:mt-3 md:-mt-20 md:ml-5 bg-gray-900 text-white p-8 group inline-flex h-10 lg:w-60 md:w-max items-center justify-center rounded-lg text-sm font-bold transition-colors hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50";
    const iconTextTheme = "pl-3 hidden lg:flex";

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex lg:flex-col md:flex-row md:items-center md:justify-center">
                <NavigationMenuItem>
                    <Link href="/dashboard/revisao" legacyBehavior passHref>
                        <NavigationMenuLink className={`${navTheme} ${select ? 'bg-green-500' : ''}`}>
                            <ArrowLeft size={24} weight="bold" />
                            <span className={iconTextTheme}>VOLTAR AO MENU</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

