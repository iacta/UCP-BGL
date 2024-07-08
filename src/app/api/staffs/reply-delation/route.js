'use server';

import axios from 'axios';
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getUserInfo } from '@/app/dashboard/user';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'

export async function POST(request) {
    const user = await getUserInfo();
    try {
        const { id, veredit, vereditDesc} = await request.json();
        const updateDelation = await prisma.delation.update({
            where: {
                id: id,
            },
            data: {
                veredit: veredit,
                vereditDescription: vereditDesc,
                adminReply: user.nick,
                resolved: "yes"
            },
        })
        /*const response = await notifyDC(veredit);

        if (response.status === 200) {
            await prisma.$disconnect()

            return NextResponse.json({ success: true, message: 'Denúncia enviada com sucesso' }, { status: 200 });
        } else {
            await prisma.$disconnect()

            return NextResponse.json({ success: true, message: 'Denúncia enviada com sucesso' }, { status: 200 });
        }*/
        await prisma.$disconnect()

        return NextResponse.json({ success: true, message: 'Denúncia resolvida com sucesso' }, { status: 200 });
    } catch (error) {
        await prisma.$disconnect()
        console.error('Erro ao criar denuncia:', error);
        return NextResponse.json({ success: false, error: 'Erro interno do servidor.' }, { status: 500 });
    }
}

export async function notifyDC(accused, reporter, accusedOrg, reporterOrg, description, reason) {
    const roleId = '913086425702989835';
    const embeds = [
        {
            title: 'Nova Denúncia',
            description: `Descrição do ocorrido: ${description}`,
            color: 15158332,
            fields: [
                {
                    name: 'Acusado',
                    value: accused || 'N/A',
                    inline: true
                },
                {
                    name: 'Org do acusado',
                    value: accusedOrg || 'N/A',
                    inline: true
                },
                {
                    name: 'Denunciado por',
                    value: reporter || 'N/A',
                    inline: true
                },
                {
                    name: 'Org do denunciante',
                    value: reporterOrg || 'N/A', 
                    inline: true
                },
                {
                    name: 'Razão',
                    value: reason || 'N/A', 
                    inline: false
                }
            ],
            footer: {
                text: 'Sistema de Denúncias',
            },
            timestamp: new Date().toISOString()
        }
    ];

    try {
        const response = await axios.post(
            `https://discord.com/api/v9/channels/1247254224383901836/messages`,
            {
                content: `<@&${roleId}>`,
                embeds
            },
            {
                headers: {
                    Authorization: `Bot ODYzOTMzMDE0NDg3NzI4MTY5.Ge1ia1.r9Wy0a1fjLLT3GVLfBaBSeLJQzQ8zXnH6sP-GU`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        return response.status;
    } catch (error) {
        if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}
