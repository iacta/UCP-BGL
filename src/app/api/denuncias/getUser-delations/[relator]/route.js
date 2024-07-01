'use server';
import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "@/app/dashboard/user";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
export async function GET(request, { params }) {
    const { relator } = params;
    const user = await getUserInfo();
    console.log('Relator:', relator)
    try {
        if (relator === 'relator') {
            const delations = await prisma.delation.findMany({
                where: {
                    relator: user.nick
                }
            });
            console.log('Delations:', delations)
            prisma.$disconnect();
            return NextResponse.json(delations);
        } else {
            const delations = await prisma.delation.findMany({
                where: {
                    accused: user.nick
                }
            });
            console.log('Delations:', delations)
            prisma.$disconnect();
            return NextResponse.json(delations);
        }

    } catch (error) {
        console.error('Erro ao listar imagens:', error);
        throw error;
    }
}
