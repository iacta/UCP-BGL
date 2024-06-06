'use client';

import { Nav } from "../components/dash/nav"
import { NavHome } from "./components/nav"
export default function Staff() {
    return (
        <>
            <main className="text-white">
                <Nav />
                <div className="pl-10 pt-5">
                    < NavHome />
                    <div className="flex justify-center items-center -mt-36">
                    </div>
                </div>
            </main>
        </>
    )
}