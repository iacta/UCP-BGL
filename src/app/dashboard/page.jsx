'use client';

import React from "react";
import { Nav, NavHome } from './components/dash/nav';
import { Perfil, Perfil2 } from './components/dash/user';

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

export default function HomePage({userInfo}) {
    return (
        <>
            <main className="text-white">
            <Nav userInfo={userInfo} />
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
