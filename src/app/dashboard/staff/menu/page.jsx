'use client'
import { NavHome } from "../components/nav"
import { Nav } from "../../components/dash/nav"
import { MenuStaff } from "./components/menu"
export default function Menu() {
    return (
        <>
            <main className="text-white">
                <Nav />
                <div className="pl-4 sm:pl-10 pt-5">
                    <NavHome />
                    <div className="flex justify-center items-center mt-8 sm:-mt-64">
                        <MenuStaff />
                    </div>
                </div>
            </main>
        </>
    )
}