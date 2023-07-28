import { cookies } from 'next/headers'
/*
import { validateAuthToken } from '@/lib/server/admin/authutil'
  import { AdminNav } from "@/components/navs/admin-nav"
import { appStore,selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { App as AppConstants } from '@/lib/types/constants';
import { App as AdminConstants } from '@/lib/types/admin/constants';
import { setCookie, } from "@/lib/server/util"

*/

import { validateAuthToken } from '@/lib/server/admin/authutil'
import { AdminNav } from "@/components/navs/admin-nav"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { App as AppConstants } from '@/lib/types/constants';
import { App as AdminConstants } from '@/lib/types/admin/constants';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { setCompanyName, setLoggedInUser, setCurrentTitle } = appDataSlice.actions
    appStore.dispatch(setCompanyName(AdminConstants.companyName))
    appStore.dispatch(setCurrentTitle(AdminConstants.rootTitle))
    const authToken = cookies().get(AppConstants.cookieAuthToken)?.value

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
