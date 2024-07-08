import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

export async function GET(request, { params }) {
    const { resolved } = params;
    try {
        const delations = await prisma.delation.findMany({
            where: {
                resolved: resolved
            }
        });
        console.log(delations)
        prisma.$disconnect();
        return NextResponse.json(delations);
    } catch (error) {
        console.error('Erro ao listar denuncias:', error);
        throw error;
    }
}
