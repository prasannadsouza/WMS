/*
  import { AppUser as CustomerAppUser } from '@/lib/types/customer/types'
import { ResponseData, AppUser as GlobalAppUser } from '@/lib/types/types'
import { errorCodes } from '@/lib/types/errorcodes'
import { Auth as AuthRequest } from '@/lib/types/request'
import { Pages } from "@/lib/types/customer/constants"

 */
import { AppUser as CustomerAppUser } from '@/lib/types/customer/types'
import { ResponseData, AppUser as GlobalAppUser } from '@/lib/types/types'
import { errorCodes } from '@/lib/types/errorcodes'
import { Auth as AuthRequest } from '@/lib/types/request'
import { Pages } from "@/lib/types/customer/constants"

export async function validateAuthToken(orgId: string, authToken: string) {
    let responseData: ResponseData<GlobalAppUser> = {
        data: null,
        errors: [],
    }

    if (!authToken.length) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.authtoken_isinvalid,
        })

        return responseData;
    }

    const user = getUsers().find((user) => user.id === authToken && user.appCustomerId === orgId) ?? null;

    if (!user) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.authtoken_isinvalid,
        })
        return responseData;
    }

    responseData.data = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
        postLoginURL: user.postLoginURL
    }

    return responseData;
}

export async function validateUser(orgId: string, authRequest: AuthRequest): Promise<ResponseData<GlobalAppUser | null>> {

    let responseData: ResponseData<GlobalAppUser> = {
        data: null,
        errors: [],
    }

    if (!authRequest?.userName?.length) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.username_cannotbe_blank,
        })
    }

    if (!authRequest?.password?.length) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.password_cannotbe_blank,
        })
    }

    if (responseData.errors!.length) return responseData;

    let user = getUsers().find((user) => user.appCustomerId === orgId && user.id?.toLowerCase() === authRequest?.userName.toLowerCase()) ?? null;

    if (!user) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.username_or_password_isinvalid,
        })
        return responseData;
    }

    responseData.data = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
        postLoginURL: user.postLoginURL
    }

    return responseData;
}

export function getUsers() {
    const users: CustomerAppUser[] = [
        {
            firstName: "Pws",
            lastName: "Admin",
            email: "pa@pws.se",
            id: "PA",
            enabled: true,
            appCustomerId: "pws",
            postLoginURL: Pages.reports.inventory,

        },
        {
            firstName: "Pws",
            lastName: "User",
            email: "pw@pws.se",
            id: "PU",
            enabled: false,
            appCustomerId: "pws",
            postLoginURL: Pages.home
        },
        {
            firstName: "Kjell",
            lastName: "Admin",
            email: "ka@kjellco.se",
            id: "KA",
            enabled: true,
            appCustomerId: "kjellco",
            postLoginURL: Pages.administration.users

        },
        {
            firstName: "Kjell",
            lastName: "User",
            email: "ku@kjellco.se",
            id: "KU",
            enabled: true,
            appCustomerId: "kjellco",
            postLoginURL: Pages.operations.picking
        },
        {
            firstName: "Möllans",
            lastName: "Admin",
            email: "ka@mollans.se",
            id: "MA",
            enabled: true,
            appCustomerId: "mollans",
            postLoginURL: Pages.administration.configuration

        },
        {
            firstName: "Möllans",
            lastName: "User",
            email: "ku@mollans.se",
            id: "MU",
            enabled: true,
            appCustomerId: "mollans"
        },
        {
            firstName: "MinCon",
            lastName: "Admin",
            email: "ka@mincon.se",
            id: "MA",
            enabled: true,
            appCustomerId: "mincon",
            postLoginURL: Pages.master.plats

        },
        {
            firstName: "MinCon",
            lastName: "User",
            email: "ku@mincon.se",
            id: "MU",
            enabled: true,
            appCustomerId: "mincon",
            postLoginURL: Pages.operations.movement
        },
    ];

    return users;
}
