import 'server-only'

/*
import { AppUser as AdminAppUser } from '@/lib/types/admin/types'
import { ResponseData, AppUser as GlobalAppUser } from '@/lib/types/types'
import { Auth as AuthRequest } from '@/lib/types/request'
import { errorCodes } from '@/lib/types/errorcodes'
*/

import { AppUser as AdminAppUser } from '@/lib/types/admin/types'
import { ResponseData, AppUser as GlobalAppUser } from '@/lib/types/types'
import { Auth as AuthRequest } from '@/lib/types/request'
import { errorCodes } from '@/lib/types/errorcodes'

export async function validateAuthToken(authToken: string) {
    let responseData: ResponseData<GlobalAppUser> = {
        data: null,
        errors: [],
    }

    if (!authToken.length) return
    {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.authtoken_isinvalid,
        })
    }

    responseData.data = getUsers().find((user) => user.id === authToken) ?? null;

    if (!responseData.data) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.authtoken_isinvalid,
        })
        return responseData;
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

    responseData.data = getUsers().find((user) => user.email?.toLowerCase() === authRequest?.userName.toLowerCase()) ?? null;

    if (!responseData.data) {
        responseData.errors!.push({
            moduleCode: errorCodes.moduleCode,
            errorCode: errorCodes.username_or_password_isinvalid,
        })
        return responseData;
    }

    return responseData;
}

export function getUsers() {
    const users: AdminAppUser[] = [
        {
            firstName: "First ",
            lastName: "Admin",
            email: "A1@wms.se",
            id: "A1"
        },
        {
            firstName: "Second",
            lastName: "Admin",
            email: "A2@wms.se",
            id: "A2"
        },
        // {
        //     firstName: "First",
        //     lastName: "C1User",
        //     email: "A1@C1.se",
        //     id: "C1U1"
        // },
        // {
        //     firstName: "Second",
        //     lastName: "C1User",
        //     email: "A2@C1.se",
        //     id: "C1U2"
        // },
        // {
        //     firstName: "First",
        //     lastName: "C2User",
        //     email: "A1@C2.se",
        //     id: "C2U1"
        // },
        // {
        //     firstName: "Second",
        //     lastName: "C2User",
        //     email: "A2@C2.se",
        //     id: "C2U2"
        // },
    ];

    return users;
}
