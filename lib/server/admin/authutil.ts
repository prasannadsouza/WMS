import 'server-only'

/*
import { AppUser as AdminAppUser, AppCustomer as AdminAppCustomer } from '@/lib/types/admin/types'
import { ResponseData, AppUser as GlobalAppUser, AppCustomer as GlobalAppCustomer } from '@/lib/types/types'
import { Auth as AuthRequest } from '@/lib/types/request'
import { errorCodes } from '@/lib/types/errorcodes'
import { Pages as CustomerPages } from '@/lib/types/customer/constants'
import { Pages as AdminPages } from '@/lib/types/admin/constants'

*/

import { AppUser as AdminAppUser, AppCustomer as AdminAppCustomer } from '@/lib/types/admin/types'
import { ResponseData, AppUser as GlobalAppUser, AppCustomer as GlobalAppCustomer } from '@/lib/types/types'
import { Auth as AuthRequest } from '@/lib/types/request'
import { errorCodes } from '@/lib/types/errorcodes'
import { Pages as CustomerPages } from '@/lib/types/customer/constants'
import { Pages as AdminPages } from '@/lib/types/admin/constants'

export async function validateAppCustomer(id: string) {
    let responseData: ResponseData<GlobalAppCustomer> = {
        data: null,
        errors: [],
    }

    let appCustomer = getCustomers().find((customer) => customer.id === id) ?? null;

    if (!appCustomer) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.customer_notregistered,
        })
        return responseData;
    }

    if (!appCustomer.enabled) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.customer_isdisabled,
        })
        return responseData;
    }

    responseData.data = {
        name: appCustomer.name,
        shortName: appCustomer.shortName,
        id: appCustomer.id,
        postLoginURL: appCustomer.postLoginURL,
    }

    return responseData;
}

export async function validateAuthToken(authToken: string) {
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

    let user = responseData.data = getUsers().find((user) => user.id === authToken) ?? null;

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

export async function validateUser(authRequest: AuthRequest): Promise<ResponseData<GlobalAppUser | null>> {

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

    let user = getUsers().find((user) => user.email?.toLowerCase() === authRequest?.userName.toLowerCase()) ?? null;

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
    const users: AdminAppUser[] = [
        {
            firstName: "First ",
            lastName: "Admin",
            email: "A1@wms.se",
            id: "A1",
            enabled: true,
            postLoginURL: AdminPages.admins
        },
        {
            firstName: "Second",
            lastName: "Admin",
            email: "A2@wms.se",
            id: "A2",
            enabled: false
        },
    ];

    return users;
}

export function getCustomers() {
    const customers: AdminAppCustomer[] = [
        {
            name: "Möllansost",
            shortName: "Möllans",
            id: "mollans",
            enabled: true,
            logoURL: "https://mollansost.com/wp-content/uploads/2022/02/mollansost_logo-200x101.png",
        },
        {
            name: "KjellCo",
            shortName: "KjellCo",
            id: "kjellco",
            enabled: true,
            logoURL: null,
            postLoginURL: CustomerPages.master.orders
        },
        {
            name: "Pure Water",
            shortName: "PWS",
            id: "pws",
            enabled: true,
            logoURL: "https://www.pure-water-services.com/images/logo.png",
            postLoginURL: CustomerPages.master.purchaseorders
        },
        {
            name: "MinCon",
            shortName: "MinCon",
            id: "mincon",
            enabled: false,
            logoURL: "https://mincon.com/wp-content/uploads/2020/01/Mincon-Logo-svg.svg",
            postLoginURL: CustomerPages.home
        }
    ]

    return customers
}
