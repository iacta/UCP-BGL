'use client';

import { Nav } from "./../components/dash/nav"
import { Store } from "./components/store";

export default function Loja() {
    return (
        <>
            <main className="text-white">
                <Nav />
                <div>
                    <Store />
                </div>
            </main>
        </>
    )
}