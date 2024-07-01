'use server';
import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "@/app/dashboard/user";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
export async function GET() {
    const user = await getUserInfo();
    try {
        const revisoes = await prisma.revision.findMany({
            where: {
                relator: user.nick
            }
        });
        console.log('revisoes:', revisoes)
        prisma.$disconnect();
        return NextResponse.json(revisoes);


    } catch (error) {
        console.error('Erro ao listar imagens:', error);
        throw error;
    }
}
