import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const cookie = req.cookies.get('user');

  if (!cookie) {
    return NextResponse.redirect('/login');
  }

  try {
    const token = req.headers.get('x-access-token');
    jwt.verify(token, process.env.API_SECRET_TOKEN);
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized', details: err.message }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/api/:path*'],
};
