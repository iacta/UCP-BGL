'use client';

import { Nav } from "../components/dash/nav"
import { NavHome } from "./components/nav"
import { Perfil } from "./components/perfil";

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

export default function Staff() {
    return (
        <>
            <main className="text-white">
                <Nav userInfo={userInfo} />
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