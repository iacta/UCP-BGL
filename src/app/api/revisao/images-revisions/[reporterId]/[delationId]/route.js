import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { reporterId, delationId } = params;

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'revisoes', reporterId, delationId.toString());
    const files = await fs.promises.readdir(uploadsDir);

    const imagens = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(extension);
    });

    const imagensComDataCriacao = await Promise.all(imagens.map(async (imagem) => {
      const filePath = path.join(uploadsDir, imagem);
      const stats = await fs.promises.stat(filePath);
      return { nome: imagem, dataCriacao: stats.birthtime };
    }));

    const imagensOrdenadas = imagensComDataCriacao.sort((a, b) => b.dataCriacao - a.dataCriacao);

    const imagensComURLs = imagensOrdenadas.map((imagem) => {
      return {
        nome: imagem.nome,
        url: `/uploads/revisoes/${reporterId}/${delationId}/${imagem.nome}`
      };
    });
    if (imagensComURLs === null) {
      return NextResponse.json({ error: 'Não há imagens para exibir.' }, { status: 404 });
    }
    return NextResponse.json(imagensComURLs);
  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    throw error;
  }
}
