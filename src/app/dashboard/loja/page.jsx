'use client';

import { Nav } from "./../components/dash/nav"
import { Store } from "./components/store";

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

export default function Loja() {
    return (
        <>
            <main className="text-white">
                <Nav userInfo={userInfo} />
                <div>
                    <Store />
                </div>
            </main>
        </>
    )
}