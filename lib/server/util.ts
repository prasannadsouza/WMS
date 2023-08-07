'use server'
import { cookies } from 'next/headers'
import { App as AppConstants } from '@/lib/types/constants';

export async function setCookie(cookiedata: any) {
    cookies().set(cookiedata)
}

export async function getAuthCookieName(orgid: string) {
    return `${AppConstants.cookie.authToken}_${orgid}`
}

export async function setAuthCookie(orgId: string, value: string) {
    await setCookie({
        name: await getAuthCookieName(orgId),
        httpOnly: true,
        value: value,
    })
}

export async function deleteAuthCookie(orgId: string) {
    console.log({
        component: "util.ts!deleteAuthCookie"
    })
    await setCookie({
        name: await getAuthCookieName(orgId),
        value: "",
        maxAge: 0
    })
}
