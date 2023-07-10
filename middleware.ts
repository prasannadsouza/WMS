/*
import { App } from '@/lib/types/constants'
*/

import { NextRequest, NextResponse } from 'next/server'
import { App } from '@/lib/types/constants'
export function middleware(request: NextRequest) {

    const authToken = request.cookies.get(App.cookieAuthToken)?.value

    console.log({
        Component: "middleware", url: request.url
        , authToken: authToken
    })

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
    ],
}
