import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname


  // Allow access to the login page
  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/sign-in') {
    const token = await getToken({ req: request, secret: process.env.SECRET })
    if (!token) {
      return NextResponse.redirect(new URL('/dashboard/sign-in', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}