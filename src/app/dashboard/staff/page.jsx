'use client';

import { Nav } from "../components/dash/nav"
import { NavHome } from "./components/nav"
import { Perfil } from "./components/perfil";
export default function Staff() {
    return (
        <>
            <main className="text-white">
                <Nav />
                <div className="lg:pl-10 lg:pt-5 md:pl-5">
                    < NavHome id={0} />
                    <div className="flex justify-center items-center mt-4 lg:pl-10 lg:-mt-64">
                        <Perfil />
                    </div>
                </div>
            </main>
        </>
    )
}