'use server';

import axios from 'axios';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getUserInfo } from '@/app/dashboard/user';
import { del, list } from '@vercel/blob';


export async function DELETE(request) {
    try {
        const { delationId, reporterId } = await request.json();
        const user = await getUserInfo();
        const delDB = await prisma.revision.delete({
            where: {
                id: delationId,
            },
        })
        const { blobs } = await list();
        
        // Filtrar os blobs com o caminho correto
        const filteredBlobs = blobs.filter(blob => blob.pathname.includes(`denuncias/${reporterId}/${delationId}`));

        // Deletar os blobs encontrados
        await Promise.all(filteredBlobs.map(async blob => {
            await del(blob.url); // Utiliza a URL do blob para deletar
        }));

        await prisma.$disconnect()

        return NextResponse.json({ success: true, message: 'Revisao deletada com sucesso' }, { status: 200 });
    } catch (error) {
        await prisma.$disconnect()
        console.error('Erro ao deletar revisao:', error);
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
