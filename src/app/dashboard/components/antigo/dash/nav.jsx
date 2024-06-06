'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import { Menu } from './sheet';

import { SignOut } from "@phosphor-icons/react";
import { getUserInfo } from '../../user';
import { CircularProgress } from './CircularProgress';  // Importar o componente CircularProgress

export function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userInfo = await getUserInfo();
                setUser(userInfo);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchUserInfo();
    }, []);

    if (!user) {
        return <CircularProgress />;
    }

    return (
        <div className="-mt-10 flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="pl-6 -mt-5 text-2xl font-bold">UCP</h1>

            </div>
            <Menu />
            <div className="flex flex-grow justify-center">
                <img src="/bgl.png" alt="Logo" className="max-h-48 w-auto mr-4" />
            </div>
            <div className="flex flex-row-reverse pr-6">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex flex-row">
                            <User size={32} weight="bold" className="pb-1" />
                            <p>{user.nick}</p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-700 text-white">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
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
            </div>
        </div>
    );
}