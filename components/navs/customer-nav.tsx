import * as React from "react"
import Link from "next/link"

/*
import { NavigationBar } from "@/components/navs/navigationbar"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { Auth as AuthRequest, AppUser } from "@/lib/types/request"
import { ResponseData } from "@/lib/types/types"
import { validateUser, } from "@/lib/server/customer/authutil"
import { setAuthCookie, deleteAuthCookie, } from "@/lib/server/util"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { MenubarItem, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarPortal, MenubarContent, } from "@/components/ui/menubar"
import { Settings, Globe, Scroll, Send, BookDown, BookUp } from "lucide-react";
import LogoutButton from "@/components/navs/logout"
import { errorCodes } from '@/lib/types/errorcodes'
import { getOrgURL } from "@/lib/utils"
import { Pages } from "@/lib/types/customer/constants"
 */


import { NavigationBar } from "@/components/navs/navigationbar"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { Auth as AuthRequest, AppUser } from "@/lib/types/request"
import { ResponseData } from "@/lib/types/types"
import { validateUser, } from "@/lib/server/customer/authutil"
import { setAuthCookie, deleteAuthCookie, } from "@/lib/server/util"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { MenubarItem, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarPortal, MenubarContent, } from "@/components/ui/menubar"
import { Settings, Globe, Scroll, Send, BookDown, BookUp } from "lucide-react";
import LogoutButton from "@/components/navs/logout"
import { errorCodes } from '@/lib/types/errorcodes'
import { getOrgURL } from "@/lib/utils"
import { Pages } from "@/lib/types/customer/constants"

function MainMenuContent() {

    const appState = appStore.getState();
    const appData = selectAppData(appState);

    if (!appData?.loggedInUser) return null;

    const orgid = selectAppData(appState).organisation!.id

    return (<MenubarContent align="start" sideOffset={5} alignOffset={-3}>
        <Link href={`${orgid}/orders`} legacyBehavior passHref>
            <NavigationMenuLink>
                <MenubarItem className="hover:border-2">
                    <BookDown className={"mr-1"} />
                    Orders
                </MenubarItem>
            </NavigationMenuLink>
        </Link>
        <Link href={`${orgid}/purchaseorders`} legacyBehavior passHref>
            <NavigationMenuLink>
                <MenubarItem className="hover:border-2">
                    <BookUp className={"mr-1"} />
                    Purchase Orders
                </MenubarItem>
            </NavigationMenuLink>
        </Link>
        <MenubarItem className="hover:border-2"> Movement
        </MenubarItem>
        <MenubarItem className="hover:border-2" disabled>Inventory</MenubarItem>
        <MenubarSeparator />
        <MenubarSub><MenubarSubTrigger className="hover:border-2">
            Master
        </MenubarSubTrigger>
            <MenubarPortal>
                <MenubarSubContent alignOffset={-5} >
                    <MenubarItem className="hover:border-2">Places</MenubarItem>
                    <MenubarItem className="hover:border-2">Article</MenubarItem>
                    <MenubarItem className="hover:border-2"> Notes </MenubarItem>
                </MenubarSubContent>
            </MenubarPortal>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarSub><MenubarSubTrigger className="hover:border-2">
            Reports
        </MenubarSubTrigger>
            <MenubarPortal>
                <MenubarSubContent alignOffset={-5} >
                    <MenubarItem className="hover:border-2">Article History</MenubarItem>
                    <MenubarItem className="hover:border-2">Inventory</MenubarItem>
                    <MenubarItem className="hover:border-2">Sync</MenubarItem>
                </MenubarSubContent>
            </MenubarPortal>
        </MenubarSub>
    </MenubarContent>)
}

function UserMenuContent() {

    const appState = appStore.getState();
    if (!selectAppData(appState).loggedInUser) return null;
    const orgId = selectAppData(appState).organisation!.id!

    async function performLogout() {
        'use server'
        const { setLoggedInUser } = appDataSlice.actions
        await deleteAuthCookie(orgId)
        appStore.dispatch(setLoggedInUser(null))
    }

    return (<MenubarContent align="start" sideOffset={5} alignOffset={-3}>
        <MenubarItem className="hover:border-2" > <Settings className={"mr-1"} />Preferences</MenubarItem>
        <MenubarItem className="hover:border-2"> <Globe className={"mr-1"} />Language</MenubarItem>
        <MenubarSeparator />
        <MenubarItem className="hover:border-2"> <Scroll className={"mr-1"} />Help</MenubarItem>
        <MenubarItem className="hover:border-2"> <Send className={"mr-1"} />Support</MenubarItem>
        <MenubarSeparator />
        <LogoutButton performLogout={performLogout} rootURL={getOrgURL(orgId, "")} />
    </MenubarContent>)
}

export function CustomerNav() {

    async function performLogin(loginRequest: AuthRequest): Promise<ResponseData<AppUser | null>> {
        "use server";
        const response: ResponseData<AppUser> = {
            data: null,
            errors: [],
        }
        const appState = appStore.getState();
        const organisation = selectAppData(appState).organisation;
        const orgId = organisation!.id!;
        const validateResponse = await validateUser(orgId, loginRequest);

        if (validateResponse.errors?.length) {
            response.errors = validateResponse.errors;
            return response;
        }

        let user = validateResponse.data;
        if (!user) {
            response.errors!.push({
                moduleCode: errorCodes.moduleCode,
                errorCode: errorCodes.username_cannotbe_blank,
            })
            return response;
        }

        response.data = {
            firstName: user!.firstName,
            lastName: user!.lastName,
            postLoginURL: getOrgURL(orgId, Pages.home)
        }

        if (organisation!.postLoginURL?.length) response.data.postLoginURL = getOrgURL(orgId, organisation!.postLoginURL!);
        if (user!.postLoginURL?.length) response.data.postLoginURL = getOrgURL(orgId, user!.postLoginURL!);

        const { setLoggedInUser } = appDataSlice.actions
        await setAuthCookie(orgId, user!.id!)
        appStore.dispatch(setLoggedInUser(response.data))
        return response;

    }
    return (<NavigationBar
        mainMenuContent={MainMenuContent()}
        userMenuContent={UserMenuContent()}
        fnValidateUser={performLogin}
    />)
}
