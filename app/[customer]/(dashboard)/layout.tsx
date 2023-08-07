import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
/*
import { appStore, } from "@/lib/store/store"
import { appDataSlice, } from "@/lib/store/appDataSlice"
import { validateAppCustomer } from '@/lib/server/admin/authutil'
import { AppCustomer, AppUser } from '@/lib/types/types'
import { getAuthCookieName } from "@/lib/server/util"
import { validateAuthToken } from "@/lib/server/customer/authutil"
import { getOrgURL } from '@/lib/utils';
*/

import { appStore, } from "@/lib/store/store"
import { appDataSlice, } from "@/lib/store/appDataSlice"
import { validateAppCustomer } from '@/lib/server/admin/authutil'
import { AppCustomer, AppUser } from '@/lib/types/types'
import { getAuthCookieName } from "@/lib/server/util"
import { validateAuthToken } from "@/lib/server/customer/authutil"
import { getOrgURL } from '@/lib/utils';
export default async function CustomerLayout({ children, params }: {
    children: React.ReactNode,
    params: { customer: string }
}) {

    const { setOrganisation, setLoggedInUser } = appDataSlice.actions

    let customer: AppCustomer | null = null;
    let user: AppUser | null = null;
    await validateOrganisation();
    await validateUser()
    appStore.dispatch(setLoggedInUser(user))
    appStore.dispatch(setOrganisation(customer))

    async function validateOrganisation() {
        if (!params.customer?.length) return;
        const responseData = await validateAppCustomer(params.customer);
        if (responseData.errors?.length || !responseData.data) return;
        customer = responseData.data;
    }

    async function validateUser() {

        if (!customer) return;
        const authToken = cookies().get(await getAuthCookieName(params.customer))?.value

        if (!authToken?.length) return;
        let responseData = await validateAuthToken(customer!.id!, authToken)
        console.log({
            component: "(dashboard)/CustomerLayout!validateUser!validateAuthToken_after",
            customer,
            responseData,
        })

        if (responseData?.errors?.length || !responseData?.data) return;
        user = responseData.data;
    }

    console.log({
        component: "(dashboard)/CustomerLayout!aftervalidate",
        customer,
        user
    })

    if (!customer) return redirect("/")
    if (!user) return redirect(getOrgURL(params.customer, ""));

    return (

        <div className="w-full h-full">
            {children}
        </div>
    );
}
