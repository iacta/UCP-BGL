import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const { reporterId, delationId } = params;
  try {
    const { blobs } = await list();

    console.log(blobs);
    const filteredBlobs = blobs.filter(blob => {
      return blob.pathname.startsWith(`denuncias/${reporterId}/${delationId}`);
    }).sort((a, b) => {
      return new Date(b.uploadedAt) - new Date(a.uploadedAt);
    });
    return NextResponse.json(filteredBlobs);
  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    throw error;
  }
}
