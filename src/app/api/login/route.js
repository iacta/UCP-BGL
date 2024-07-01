import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'

export async function POST(request) {
    const { username, password } = await request.json();

    const user = await prisma.users.findUnique({
        where: { nick: username },
    });

    if (user) {
        console.log('User found');
    } else {
        console.log('User not found');
    }
  
    if (user && await bcrypt.compare(password, user.password)) {
        const info = {
            nick: username,
            createdAt: user.createdAt,
            skinID: user.skinID,
            helper: user.helper,
            staff: user.staffLevel
        }
        cookies().set('user', JSON.stringify(info), { secure: true })
        console.log('Password match');
        await prisma.$disconnect()
        return NextResponse.json({ message: 'Login successful' });
    } else {
        console.log('Password does not match');
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
