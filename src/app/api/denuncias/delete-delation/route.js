'use server';
import axios from 'axios';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getUserInfo } from '@/app/dashboard/user';
import fs from 'fs';
import path from 'path';

export async function DELETE(request) {
    try {
        const { delationId, reporterId } = await request.json();
        const user = await getUserInfo();
        const del = await prisma.delation.delete({
            where: {
                id: delationId,
            },
        })
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', reporterId, delationId.toString());
        await deleteFolderRecursive(uploadsDir);
        await prisma.$disconnect()

        return NextResponse.json({ success: true, message: 'Denúncia deletada com sucesso' }, { status: 200 });
    } catch (error) {
        await prisma.$disconnect()
        console.error('Erro ao criar denuncia:', error);
        return NextResponse.json({ success: false, error: 'Erro interno do servidor.' }, { status: 500 });
    }
}

async function deleteFolderRecursive(folderPath) {
    if (await fs.promises.stat(folderPath).catch(() => false)) {
        const files = await fs.promises.readdir(folderPath);
        await Promise.all(files.map(async (file) => {
            const curPath = path.join(folderPath, file);
            const stat = await fs.promises.lstat(curPath);
            if (stat.isDirectory()) {
                // Recursivamente deleta subdiretórios
                await deleteFolderRecursive(curPath);
            } else {
                // Deleta arquivo
                await fs.promises.unlink(curPath);
            }
        }));
        // Deleta o diretório vazio
        await fs.promises.rmdir(folderPath);
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
