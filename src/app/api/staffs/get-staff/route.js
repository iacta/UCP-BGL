'use server';

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserInfo } from "@/app/dashboard/user";

export async function GET() {
    const user = await getUserInfo();
    try {
        const res = await prisma.staff.findUnique({
            where: {
                nick: user.nick
            },
            include: {
                Warns: true,
                User: true
            },
        })
        prisma.$disconnect();
        return NextResponse.json(res, { status: 200 })
    } catch (error) {
        console.log('Erro ao pegar informações! ', error);
        prisma.$disconnect();
    }
}