import { NextResponse } from 'next/server';
import { get } from '@vercel/blob';

export async function GET(request, { params }) {
  const { reporterId, delationId } = params;

  try {
    const images = await get(`denuncias/${reporterId}/${delationId}`);

    const imagensComURLs = images.map((image) => {
      return {
        nome: image.Key.split('/').pop(),
        url: image.Location
      };
    });

    return NextResponse.json(imagensComURLs);
  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    throw error;
  }
}
