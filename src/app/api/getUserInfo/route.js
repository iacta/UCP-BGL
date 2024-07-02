'use server';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getUserInfo } from '@/app/dashboard/user';

export async function GET(request) {
    try {
        const user = await getUserInfo();
        const info = await prisma.users.findUnique({
            where: {
                nick: user.nick
            }
        });
        return NextResponse.json(info);
    } catch (error) {
        console.error('Erro ao pegar informações:', error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}
