import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
/*
import { validateAuthToken } from "@/lib/server/admin/authutil"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { App as AdminConstants } from '@/lib/types/admin/constants';
import { getAuthCookieName } from "@/lib/server/util"
import { getOrgURL } from '@/lib/utils';
*/

import { validateAuthToken } from "@/lib/server/admin/authutil"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { App as AdminConstants } from '@/lib/types/admin/constants';
import { getAuthCookieName } from "@/lib/server/util"
import { getOrgURL } from '@/lib/utils';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const { setLoggedInUser } = appDataSlice.actions
    const authToken = cookies().get(await getAuthCookieName(AdminConstants.orgId))?.value

    if (authToken?.length) {
        let responseData = await validateAuthToken(authToken)
        appStore.dispatch(setLoggedInUser(responseData?.data))
        if (!responseData?.data) return redirect(getOrgURL(AdminConstants.orgId, ""));
    }
    else {
        if (selectAppData(appStore.getState()).loggedInUser) appStore.dispatch(setLoggedInUser(null))
        return redirect(getOrgURL(AdminConstants.orgId, ""));
    }

    return (

        <div className="w-full h-full">
            {children}
        </div>
    );
}
