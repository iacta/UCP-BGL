'use client';

import { Nav } from "../components/dash/nav"
import { Revision } from "./components/revision";

export default function Revisao() {
    return (
        <>
            <main className="text-white">
                <Nav />

                <div>
                    <Revision />
                </div>
            </main>
        </>
    )
}