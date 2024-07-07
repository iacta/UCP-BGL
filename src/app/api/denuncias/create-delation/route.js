'use server';

import axios from 'axios';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'
import { getUserInfo } from '@/app/dashboard/user';
import { put } from '@vercel/blob';

export async function POST(request) {
  try {
    const info = await getUserInfo();
    const { reason, images, accused, accusedOrg, reporterOrg, description, staff } = await request.json();
    const reporter = info.nick;

    const result = await prisma.delation.create({
      data: {
        title: `${reporter} x ${accused}: ${reason}`,
        relator: reporter,
        reason: reason,
        accused: accused,
        orgRelator: reporterOrg,
        orgAccused: accusedOrg,
        staff: staff,
        description: description,
      },
    });

    const uploadedImageUrls = await Promise.all(
      images.map(async (image) => {
        const [mimeType, base64Data] = image.split(';base64,');
        const buffer = Buffer.from(base64Data, 'base64');
        const fileName = `${uuidv4()}.${mimeType.split('/')[1]}`;
        const filePath = `denuncias/${reporter}/${result.id}/${fileName}`; 

        const blob = await put(filePath, buffer, {
          access: 'public',
        });

        return blob.url;
      })
    );

    const response = await notifyDC(accused, reporter, accusedOrg, reporterOrg, description, reason);

    if (response.status === 200) {
      await prisma.$disconnect();
      return NextResponse.json({ success: true, message: 'Denúncia enviada com sucesso', imageUrls: uploadedImageUrls }, { status: 200 });
    } else {
      await prisma.$disconnect();
      return NextResponse.json({ success: true, message: 'Denúncia enviada com sucesso', imageUrls: uploadedImageUrls }, { status: 200 });
    }
  } catch (error) {
    await prisma.$disconnect();
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
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
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
