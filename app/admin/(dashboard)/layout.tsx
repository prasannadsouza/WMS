import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
/*
  import { validateAuthToken } from "@/lib/server/admin/authutil"
  import { appStore } from "@/lib/store/store"
  import { appDataSlice,selectAppData } from "@/lib/store/appDataSlice"
  import { App as AppConstants } from '@/lib/types/constants';
  import { App as AdminConstants } from '@/lib/types/admin/constants';
  import { Pages } from '@/lib/types/admin/constants';
*/

import { validateAuthToken } from "@/lib/server/admin/authutil"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { App as AppConstants } from '@/lib/types/constants';
import { App as AdminConstants } from '@/lib/types/admin/constants';
import { Pages } from '@/lib/types/admin/constants';


export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const { setCompanyName, setLoggedInUser } = appDataSlice.actions
    appStore.dispatch(setCompanyName(AdminConstants.companyName))
    const authToken = cookies().get(AppConstants.cookieAuthToken)?.value

    if (authToken?.length) {
        let responseData = await validateAuthToken(authToken)
        appStore.dispatch(setLoggedInUser(responseData?.data))
        if (!responseData?.data) return redirect(Pages.root);
    }
    else {
        if (selectAppData(appStore.getState()).loggedInUser) appStore.dispatch(setLoggedInUser(null))
        return redirect(Pages.root);
    }

    return (

        <div className="w-full h-full">
            {children}
        </div>
    );
}
