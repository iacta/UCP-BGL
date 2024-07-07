import { NextResponse } from 'next/server';
import { get } from '@vercel/blob';
import { list } from '@vercel/blob';
 
export const runtime = 'edge';

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

    const { blobs } = await list();

    console.log(blobs);
    return NextResponse.json(imagensComURLs);
  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    throw error;
  }
}
