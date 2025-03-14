'use server';

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'
import 'dotenv/config'
import jwt from 'jsonwebtoken';

export async function POST(request) {
    const { username, password } = await request.json();
    console.log(`o Usuário: ${username} está tentando se conectar ao UCP! `)

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
        cookies().set('user', JSON.stringify(info), {
            secure: true, httpOnly: true,
            sameSite: 'Strict'
        })
        jwt.sign({ userNick: username }, process.env.API_SECRET_TOKEN, { expiresIn: 300 })
        console.log('Password match');
        await prisma.$disconnect()
        return NextResponse.json({ message: 'Login successful' });
    } else {
        console.log('Password does not match');
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
