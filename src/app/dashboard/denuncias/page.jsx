'use client'
import { Nav } from "./../components/dash/nav";
import { Delation } from "./components/delation";

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

export default function Denuncias() {
    return (
        <>
            <main className="text-white">
            <Nav userInfo={userInfo} />
                <div>
                    <Delation />
                </div>
            </main>
        </>
    )
}