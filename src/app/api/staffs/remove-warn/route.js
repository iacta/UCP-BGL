'use server';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserInfo } from '@/app/dashboard/user';

export async function POST(request) {
    try {
        const info = await getUserInfo();
        const { value } = await request.json();

        if (isNaN(value) || value <= 0) {
            return NextResponse.json({ success: false, error: 'O valor fornecido não é válido.' }, { status: 400 });
        }

        const staffId = 4; // ID do staff para deletar avisos

        // Buscar os avisos para deletar
        const warningsToDelete = await prisma.warn.findMany({
            where: { staffID: staffId },
            take: value,
        });

        if (warningsToDelete.length === 0) {
            return NextResponse.json({ success: false, error: 'Nenhum aviso encontrado para remover.' }, { status: 404 });
        }

        // Deletar os avisos encontrados
        for (const warn of warningsToDelete) {
            await prisma.warn.delete({
                where: { id: warn.id },
            });
        }

        await prisma.$disconnect();

        return NextResponse.json({ success: true, message: 'Aviso removido com sucesso' }, { status: 200 });

    } catch (error) {
        await prisma.$disconnect();
        console.error('Erro ao remover aviso:', error);
        return NextResponse.json({ success: false, error: 'Erro interno do servidor.' }, { status: 500 });
    }
}
