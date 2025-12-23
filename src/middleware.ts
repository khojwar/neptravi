import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value || await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })
    const { pathname } = request.nextUrl;

    // protect profile route
    if (pathname.startsWith('/profile')) {
        if (!token) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    // prevent logged-in user from visiting login
    if (pathname.startsWith('/signin')) {
        if (token) {
            return NextResponse.redirect(new URL('/profile', request.url));
        }
    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/profile/:path*', '/signin'],
};
