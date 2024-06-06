import { GameDig } from 'gamedig';
import { NextResponse } from 'next/server';
export async function GET(req, res) {
  try {
    const state = await GameDig.query({
      type: 'gtasam',
      host: '144.217.128.205',
    });

    const players = state.players.map(player => ({
      id: player.raw.id,
      name: player.name,
      score: player.raw.score,
      ping: player.raw.ping
    }));
    let response = NextResponse.next()
    response.cookies.set('players', players)

    return response;
  } catch (error) {
    console.error("Erro ao consultar o servidor:", error);
  }
}
