import { cookies } from 'next/headers'
/*

import { validateAuthToken } from '@/lib/server/admin/authutil'
import { AdminNav } from "@/components/navs/admin-nav"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { App as AdminConstants } from '@/lib/types/admin/constants';
import { AppCustomer } from '@/lib/types/types'
import { getAuthCookieName } from "@/lib/server/util"

*/

import { validateAuthToken } from '@/lib/server/admin/authutil'
import { AdminNav } from "@/components/navs/admin-nav"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { App as AdminConstants } from '@/lib/types/admin/constants';
/*
  import { AppCustomer } from '@/lib/types/types'
import { getAuthCookieName } from "@/lib/server/util"
 */
import { AppCustomer } from '@/lib/types/types'
import { getAuthCookieName } from "@/lib/server/util"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { setOrganisation, setLoggedInUser, setCurrentTitle } = appDataSlice.actions
    const organisation = {
        name: AdminConstants.companyName,
        shortName: AdminConstants.shortName,
        id: AdminConstants.orgId,
    } as AppCustomer

    appStore.dispatch(setOrganisation(organisation))
    appStore.dispatch(setCurrentTitle(AdminConstants.rootTitle))
    const authToken = cookies().get(await getAuthCookieName(AdminConstants.orgId))?.value

    if (authToken?.length) {
        let responseData = await validateAuthToken(authToken)
        appStore.dispatch(setLoggedInUser(responseData?.data))
    }
    else {
        if (selectAppData(appStore.getState()).loggedInUser) appStore.dispatch(setLoggedInUser(null))
    }

    return (
        <div className="w-full h-full">
            <AdminNav />
            <div>
                {children}
            </div>
        </div>
    );
}
