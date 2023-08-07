import { cookies } from 'next/headers'
/*
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice, } from "@/lib/store/appDataSlice"
import { CustomerNav } from "@/components/navs/customer-nav";
import { validateCustomer } from '@/lib/server/admin/authutil'
import { AppCustomer, AppUser } from '@/lib/types/types'
import { getAuthCookieName } from "@/lib/server/util"
import { validateAuthToken } from "@/lib/server/customer/authutil"
  */
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice, } from "@/lib/store/appDataSlice"
import { CustomerNav } from "@/components/navs/customer-nav";
import { validateAppCustomer } from '@/lib/server/admin/authutil'
import { AppCustomer, AppUser } from '@/lib/types/types'
import { getAuthCookieName } from "@/lib/server/util"
import { validateAuthToken } from "@/lib/server/customer/authutil"

export default async function CustomerLayout({ children, params }:
    {
        children: React.ReactNode,
        params: { customer: string }
    }) {

    const { setOrganisation, setLoggedInUser } = appDataSlice.actions

    const currentCustomer = selectAppData(appStore.getState()).organisation
    const currentUser = selectAppData(appStore.getState()).loggedInUser

    console.log({
        component: "CustomerLayout",
        currentCustomer,
        currentUser,
    })

    let organisation: AppCustomer | null = null;
    let user: AppUser | null = null;
    await validateOrganisation();
    await validateUser()
    appStore.dispatch(setLoggedInUser(user))
    appStore.dispatch(setOrganisation(organisation))

    console.log({
        component: "customerlayout!beforelogin",
        params,
        organisation: organisation,
        user: user,
    })

    async function validateOrganisation() {
        if (!params.customer?.length) return;
        const responseData = await validateAppCustomer(params.customer);
        if (responseData.errors?.length || !responseData.data) return;
        organisation = responseData.data;
    }

    async function validateUser() {
        if (!organisation) return;
        const authToken = cookies().get(await getAuthCookieName(params.customer))?.value
        if (!authToken?.length) return;
        let responseData = await validateAuthToken(organisation!.id!, authToken)
        if (responseData?.errors?.length || !responseData?.data) return;
        user = responseData.data;
    }

    function getChildren() {
        if (!organisation) return (<UnRegisteredCustomer />)
        return <>{children}</>
    }

    return (
        <div className="w-full h-full">
            <CustomerNav />
            <div className="px-4 pt-4">
                {getChildren()}
            </div>
        </div>
    );
}

function UnRegisteredCustomer() {
    return (<div>Please register for WMS or Contact Support for more information</div>)
}
