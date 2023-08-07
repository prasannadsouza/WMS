/*
import { App } from '@/lib/types/constants'
*/

import { NextRequest, NextResponse } from 'next/server'
export function middleware(request: NextRequest) {

    const authTokens = request.cookies.getAll().map((cookie) => { return { name: cookie.name, value: cookie.value } })

    console.log({
        Component: "middleware", url: request.url
        , authTokens
    })

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
    ],
}
