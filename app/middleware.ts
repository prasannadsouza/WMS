import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/redirected', request.url))

    }
    if (request.nextUrl.pathname === '/another') {
        return NextResponse.rewrite(new URL('/rewrite', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
        "/^(?!\/[a-zA-Z0-9]+\/(login|logout)\/).*/",
    ],
}
