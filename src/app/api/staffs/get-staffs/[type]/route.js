import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function GET(request, { params }) {
    const { type } = params;
    try {
        let staffs;
        if (type === 'staff') {
            staffs = await prisma.staff.findMany({
                orderBy: {
                    level: 'desc'
                },
                include: {
                    Warns: true,
                    User: true
                },
            });

        } else if (type === 'helper') {
            staffs = await prisma.users.findMany({
                where: {
                    helper: true
                }
            });
        } else {
            throw new Error(`Tipo '${type}' não reconhecido.`);
        }

        console.log(staffs);

        prisma.$disconnect();
        return NextResponse.json(staffs);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        throw error;
    }
}
