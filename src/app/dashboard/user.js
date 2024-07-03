// functions/user.js
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getUserInfo() {
    try {
        const cookieStore = cookies()
        const userCookie = cookieStore.get('user')

        if (userCookie && typeof userCookie.value === 'string') {
            const user = JSON.parse(userCookie.value)
            return user
        } else {
            redirect('/')
        }
    } catch (error) {
        console.error('Error parsing user cookie:', error)
        redirect('/')
    }
}

export async function getUser() {
    try {
        const cookieStore = cookies()
        const hasCookie = cookieStore.has('user')
        if (hasCookie) {
            redirect('/dashboard')
        } else {
            return
        }
    } catch (error) {
        console.error('Error parsing user cookie:', error)
        redirect('/')
    }
}

export async function logout() {
    try {
        const cookieStore = cookies()
        const hasCookie = cookieStore.has('user')
        if (hasCookie) {
            cookieStore.delete('user')
            redirect('/')
        }
    } catch (error) {
        console.error('Error parsing user cookie:', error)
        redirect('/')
    }
}

export async function getStaff() {
    try {
        const data = await getUserInfo()
        if (!data.staff) {
            redirect('/dashboard')
        }
    } catch (error) {
        console.error('Error parsing user cookie:', error)
        redirect('/')
    }
}
