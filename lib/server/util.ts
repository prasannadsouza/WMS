'use server'
import { cookies } from 'next/headers'
export async function setCookie(cookiedata: any) {
    cookies().set(cookiedata)
}
