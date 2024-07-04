'use server';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserInfo } from '@/app/dashboard/user';

export async function POST(request) {
    const info = await getUserInfo();
    try {
        const { about, value } = await request.json();
        
        if (isNaN(value) || value <= 0) {
            return NextResponse.json({ success: false, error: 'O valor fornecido não é válido.' }, { status: 400 });
        }

        for (let i = 0; i < value; i++) {
            await prisma.warn.create({
                data: {
                    reason: about,
                    issuedBy: info.nick,
                    staff: {
                        connect: { id: 4 } // Assuming '4' is the ID of the 'LinkedSafe' staff member
                    },
                },
            });
        }

        await prisma.staff.update({
            where: { id: 4 },
            data: { warns: { increment: value } },
        });
        
        await prisma.$disconnect();

        return NextResponse.json({ success: true, message: 'Aviso enviado com sucesso' }, { status: 200 });

    } catch (error) {
        await prisma.$disconnect();
        console.error('Erro ao criar aviso:', error);
        return NextResponse.json({ success: false, error: 'Erro interno do servidor.' }, { status: 500 });
    }
}
