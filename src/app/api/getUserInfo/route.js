import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getUserInfo } from '@/app/dashboard/user';
import { cookies } from 'next/headers'

export async function GET(request) {
    try {
        const user = await getUserInfo();
        const info = await prisma.users.findUnique({
            where: {
                nick: user.nick
            }
        })
        prisma.$disconnect();
        return NextResponse.json(info);
    } catch (error) {
        console.error('Erro ao pegar informações:', error);
        throw error;
    }
}