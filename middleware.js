import { NextResponse } from 'next/server'

export function middleware(req) {
  const cookie = req.cookies.get('user')

  if (!cookie) {
    return NextResponse.redirect('/login')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/api/:path*'],
}
