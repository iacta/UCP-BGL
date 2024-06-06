import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function GET(request, { params }) {
    const { veredit } = params;

    try {
        const delations = await prisma.delation.findMany({
            where: {
                veredit: veredit
            }
        });

        return NextResponse.json(delations);
    } catch (error) {
        console.error('Erro ao listar imagens:', error);
        throw error;
    }
}
