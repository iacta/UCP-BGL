'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function getUserInfo() {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');

    if (userCookie && typeof userCookie.value === 'string') {
        try {
            const user = JSON.parse(userCookie.value);
            return user;
        } catch (error) {
            console.error('Error parsing user cookie:', error);
            redirect('/');
        }
    } else {
        redirect('/');
    }
}

export async function getUser() {
    const cookieStore = cookies();
    const hasCookie = cookieStore.has('user')
    if (hasCookie)
        return redirect('/dashboard');
    else
        return;
}