import axios from 'axios';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'

export async function POST(request) {
  try {
    const { reason, images, accused, reporter, accusedOrg, reporterOrg, description, staff } = await request.json();
    const result = await prisma.delation.create({
      data: {
        title: `${reporter} x ${accused}: ${reason}`,
        relator: reporter,
        reason: reason,
        accused: accused,
        orgRelator: reporterOrg,
        orgAccused: accusedOrg,
        staff: staff,
        description: description
      }
    })
    await Promise.all(images.map(async (image, index) => {
      const [mimeType, base64Data] = image.split(';base64,');
      const extension = mimeType.split('/')[1];
      const buffer = Buffer.from(base64Data, 'base64');

      const fileName = `${uuidv4()}.${extension}`;

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', reporter, result.id.toString());

      await fs.promises.mkdir(uploadsDir, { recursive: true });

      const filePath = path.join(uploadsDir, fileName);

      await fs.promises.writeFile(filePath, buffer);
    }));
    const responseDC = await notifyDC
    if (response.status === 200) {
      await prisma.$disconnect()

      return NextResponse.json({ success: true, message: 'Denúncia enviada com sucesso' }, { status: 200 });
    } else {
      await prisma.$disconnect()

      return NextResponse.json({ success: false, error: 'Erro ao enviar denúncia para o Discord.' }, { status: 500 });
    }
  } catch (error) {
    await prisma.$disconnect()
    console.error('Erro ao criar denuncia:', error);
    return NextResponse.json({ success: false, error: 'Erro interno do servidor.' }, { status: 500 });
  }
}


export async function GET(request) {
  const { reporterId, delationId } = request.json();
  try {
    const imagens = await listarImagens(reporterId, delationId);
    return NextResponse.json({ imagens });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter imagens.' }, { status: 500 });
  }
}

export async function listImages(reporterId, delationId) {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', reporterId, delationId.toString());
    const files = await fs.promises.readdir(uploadsDir);

    const imagens = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(extension);
    });

    // Obtendo a data de criação de cada arquivo e associando-a ao nome do arquivo
    const imagensComDataCriacao = await Promise.all(imagens.map(async (imagem) => {
      const filePath = path.join(uploadsDir, imagem);
      const stats = await fs.promises.stat(filePath);
      return { nome: imagem, dataCriacao: stats.birthtime };
    }));

    // Ordenando as imagens por data de criação (cronológica)
    const imagensOrdenadas = imagensComDataCriacao.sort((a, b) => b.dataCriacao - a.dataCriacao);

    // Convertendo para URLs
    const imagensComURLs = imagensOrdenadas.map((imagem) => {
      return {
        nome: imagem.nome,
        url: `/uploads/${reporterId}/${delationId}/${imagem.nome}`
      };
    });

    return imagensComURLs;
  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    throw error;
  }
}


export async function notifyDC(data) {
  const { evidenceUrls, accused, reporter, accusedOrg, reporterOrg, description } = data;
  const roleId = '913086425702989835';

  const embeds = [
    {
      title: 'Nova Denúncia',
      description: `Descrição do ocorrido: ${description}`,
      color: 15158332,
      fields: [
        {
          name: 'Acusado',
          value: accused,
          inline: true
        },
        {
          name: 'Org do acusado',
          value: accusedOrg,
          inline: true
        },
        {
          name: 'Denunciado por',
          value: reporter,
          inline: true
        },
        {
          name: 'Org do denunciante',
          value: reporterOrg,
          inline: true
        },
        {
          name: 'Razão',
          value: reason,
          inline: false
        }
      ],
      footer: {
        text: 'Sistema de Denúncias',
      },
      timestamp: new Date().toISOString()
    }
  ];

  if (evidenceUrls && evidenceUrls.length > 0) {
    evidenceUrls.forEach((url, index) => {
      embeds.push({
        image: {
          url: url
        },
        footer: {
          text: `Evidência ${index + 1}`
        }
      });
    });
  }

  console.log('Embeds:', embeds);

  const response = await axios.post(
    `https://discord.com/api/v9/channels/1247254224383901836/messages`,
    {
      content: `<@&${roleId}>`,
      embeds
    },
    {
      headers: {
        Authorization: `Bot ODYzOTMzMDE0NDg3NzI4MTY5.Ge1ia1.r9Wy0a1fjLLT3GVLfBaBSeLJQzQ8zXnH6sP-GU`, // Substitua SEU_TOKEN_DO_BOT pelo token do seu bot
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('Response status:', response.status);
  console.log('Response data:', response.data);

  return response.status;
}

