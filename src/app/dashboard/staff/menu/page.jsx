'use client'
import { NavHome } from "../components/nav"
import { Nav } from "../../components/dash/nav"
import { MenuStaff } from "./components/menu"

export async function getServerSideProps(context) {
    const res = await fetch('/api/getUserInfo', {
        headers: {
            Cookie: context.req.headers.cookie,
        },
    });
    const userInfo = await res.json();

    return {
        props: { userInfo },
    };
}

export default function Menu() {
    return (
        <>
            <main className="text-white">
                <Nav userInfo={userInfo} />
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