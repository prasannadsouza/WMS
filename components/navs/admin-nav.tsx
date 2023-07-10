import * as React from "react"
import Link from "next/link"

/*
import { cn } from "@/lib/utils"
import { NavigationBar, getMenuIconClass } from "@/components/navs/navigationbar"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { Auth as AuthRequest, AppUser } from "@/lib/types/request"
import { ResponseData } from "@/lib/types/types"
import { validateUser,  } from "@/lib/server/admin/authutil"
import { setCookie, } from "@/lib/server/util"
import { App as AppConstants } from '@/lib/types/constants';
import { Pages } from "@/lib/types/admin/constants"
import {   NavigationMenuLink } from "@/components/ui/navigation-menu"
import { MenubarItem, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarPortal, MenubarContent, } from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import LogoutButton from "@/components/navs/logout"
 */

import { cn } from "@/lib/utils"
import { NavigationBar, getMenuIconClass } from "@/components/navs/navigationbar"
import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { Auth as AuthRequest, AppUser } from "@/lib/types/request"
import { ResponseData } from "@/lib/types/types"
import { validateUser, } from "@/lib/server/admin/authutil"
import { setCookie, } from "@/lib/server/util"
import { App as AppConstants } from '@/lib/types/constants';
import { Pages } from "@/lib/types/admin/constants"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { MenubarItem, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarPortal, MenubarContent, } from "@/components/ui/menubar"
import { Warehouse, Users2, Settings, Globe, Scroll, Send } from "lucide-react";
import LogoutButton from "@/components/navs/logout"

function MainMenuContent() {
    const appData = selectAppData(appStore.getState());

    if (!appData?.loggedInUser) return null;

    return (<MenubarContent align="start" sideOffset={5} alignOffset={-3}>
        <Link href="/admin/admins" legacyBehavior passHref>
            <NavigationMenuLink>
                <MenubarItem className="hover:border-2">
                    <Users2 className={"mr-1"} />
                    Users
                </MenubarItem>
            </NavigationMenuLink>
        </Link>
        <Link href="/admin/customers" legacyBehavior passHref>
            <NavigationMenuLink>
                <MenubarItem className="hover:border-2">
                    <Warehouse className={"mr-1"} />
                    Customers
                </MenubarItem>
            </NavigationMenuLink>
        </Link>
        <MenubarItem className="hover:border-2"> New Window{' '}
            <div className={getMenuIconClass()}>⌘ N </div>
        </MenubarItem>
        <MenubarItem className="hover:border-2" disabled>New Incognito Window</MenubarItem>
        <MenubarSeparator />
        <MenubarSub><MenubarSubTrigger className="hover:border-2">
            Share
        </MenubarSubTrigger>
            <MenubarPortal>
                <MenubarSubContent alignOffset={-5} >
                    <MenubarItem className="hover:border-2"> Email Link </MenubarItem>
                    <MenubarItem className="hover:border-2">Messages </MenubarItem>
                    <MenubarItem className="hover:border-2"> Notes </MenubarItem>
                </MenubarSubContent>
            </MenubarPortal>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem className="hover:border-2"> Print…{' '}
            <div className={getMenuIconClass()}> ⌘ P </div>
        </MenubarItem>
    </MenubarContent>)
}

function UserMenuContent() {
    if (!selectAppData(appStore.getState()).loggedInUser) return null;

    async function performLogout() {
        'use server'
        setCookie({
            name: AppConstants.cookieAuthToken,
            value: "",
            maxAge: 0
        })
        const { setLoggedInUser } = appDataSlice.actions
        appStore.dispatch(setLoggedInUser(null))
    }

    return (<MenubarContent align="start" sideOffset={5} alignOffset={-3}>
        <MenubarItem className="hover:border-2" > <Settings className={"mr-1"} />Preferences</MenubarItem>
        <MenubarItem className="hover:border-2"> <Globe className={"mr-1"} />Language</MenubarItem>
        <MenubarSeparator />
        <MenubarItem className="hover:border-2"> <Scroll className={"mr-1"} />Help</MenubarItem>
        <MenubarItem className="hover:border-2"> <Send className={"mr-1"} />Support</MenubarItem>
        <MenubarSeparator />
        <LogoutButton performLogout={performLogout} rootURL={Pages.root} />


    </MenubarContent>)
}

export function AdminNav() {

    async function performLogin(loginRequest: AuthRequest): Promise<ResponseData<AppUser | null>> {

        "use server";
        const response = await validateUser(loginRequest);
        if (response.errors?.length) return response;

        setCookie({
            name: AppConstants.cookieAuthToken,
            httpOnly: true,
            value: response.data!.id,
        })

        const { setLoggedInUser } = appDataSlice.actions
        appStore.dispatch(setLoggedInUser(response.data))
        return response;

    }
    return (<NavigationBar
        mainMenuContent={MainMenuContent()}
        userMenuContent={UserMenuContent()}
        fnValidateUser={performLogin}
        postLoginURL={Pages.home}
        appLogoSource={"https://jlmwms.se/wp-content/uploads/2023/02/jlm_logo_400.png"} />)
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}                    {...props} >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
