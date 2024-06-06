'use client';

import React from "react";
import { Nav, NavHome } from './components/dash/nav';
import { Perfil, Perfil2 } from './components/dash/user';

export default function HomePage() {
    return (
        <>
            <main className="text-white">
                <Nav />
{/*                 <div className="flex justify-center items-center mt-2">
                    <Perfil2 />
                </div>
                <div className="flex flex-row pl-5 -pt-10">
                    <NavHome id={0} />
                    <Perfil />
                </div> */}
                <div>
                    <Perfil />
                </div>
            </main>
        </>
    );
}
