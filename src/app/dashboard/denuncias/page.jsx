'use client'
import { Nav } from "./../components/dash/nav";
import { Delation } from "./components/delation";

export default function Denuncias() {
    return (
        <>
            <main className="text-white">
                <Nav />
                <div>
                    <Delation />
                </div>
            </main>
        </>
    )
}