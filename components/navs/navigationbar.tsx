/*
import { cn } from "@/lib/utils"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarPortal } from "@/components/ui/menubar"
import { NavigationMenu } from "@/components/ui/navigation-menu"
import { appStore, selectAppData } from "@/lib/store/store"
import LoginForm from "@/components/navs/loginform"
import { ResponseData } from "@/lib/types/types"
import { Auth as LoginRequest, AppUser } from "@/lib/types/request"
import { PageTitle } from "@/components/customui/pagetitle"
import { App as AdminConstants } from "@/lib/types/admin/constants"
import { App as WMSConstants } from "@/lib/types/wms/constants"
*/

import { User, ChevronDown, Menu, LogIn } from "lucide-react";
import { cn } from "@/lib/utils"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarPortal } from "@/components/ui/menubar"
import { NavigationMenu } from "@/components/ui/navigation-menu"
import { appStore, selectAppData } from "@/lib/store/store"
import LoginForm from "@/components/navs/loginform"
import { ResponseData } from "@/lib/types/types"
import { Auth as LoginRequest, AppUser } from "@/lib/types/request"
import { PageTitle } from "@/components/customui/pagetitle"
import { App as AdminConstants } from "@/lib/types/admin/constants"
import { App as CustomerConstants } from "@/lib/types/customer/constants"
export const getMenuItemClass = () => {
    return cn("cursor-pointer group text-[15px] leading-none text-slate-700 rounded flex items-center h-[40px] px-[10px] relative select-none outline-none data-[state=open]:bg-slate-400 data-[state=open]:text-slate-600 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-slate-500 data-[highlighted]:to-slate-950 data-[highlighted]:text-slate-100 data-[highlighted]:data-[state=open]:text-slate-100 data-[disabled]:text-slate-300 data-[disabled]:pointer-events-none");
}

export const getMenuSeperatorClass = () => {
    return ("h-[1px] bg-slate-600 m-[5px]");
}

export const getMenuIconClass = () => {
    return cn("ml-auto pl-5 text-slate-900 group-data-[highlighted]:text-white group-data-[disabled]:text-slate-800");
}

export const getMenuContentClass = () => {
    return cn("z-10 min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]")
}

export const getMenuMainIconClass = () => {
    return cn("outline-none select-none font-medium leading-none text-[15px] flex items-center justify-between gap-[2px] m-auto");
}

function getMenuBarImageSource(): string {
    const appState = appStore.getState();
    const organisation = selectAppData(appState).organisation;

    if (!organisation) return "/vercel.svg"
    if (organisation?.logoURL?.length) return organisation.logoURL;
    if (organisation.id === AdminConstants.orgId) return AdminConstants.logoURL;
    return CustomerConstants.logoURL;
}

function getMainMenu(props: NavigationBarProps) {
    function getImage() {
        const className = props.userMenuContent ? cn("hidden sm:inline") : cn("")
        return (<img className={className} src={getMenuBarImageSource()} style={{ width: "70px", height: "35px" }} />)
    }

    if (props.mainMenuContent) {
        return (<Menubar className="flex border-0">
            <MenubarMenu>
                <MenubarTrigger className={cn("p-0 cursor-pointer m-auto p-1 hover:border-2")}>
                    <Menu size="35" />
                    {getImage()}
                </MenubarTrigger>
                <MenubarPortal>
                    {props.mainMenuContent}
                </MenubarPortal>
            </MenubarMenu>
        </Menubar >)
    }

    return (<div className={getMenuMainIconClass()}>
        {getImage()}
    </div>)
}

export function getUserMenuTriggerTitle() {

    const companyName = selectAppData(appStore.getState()).organisation!.shortName
    const user = selectAppData(appStore.getState()).loggedInUser;
    const firstName = user?.firstName ?? "";
    const lastName = user?.lastName ?? "";
    const fullName = firstName + " " + lastName;
    let initials = (firstName.length) > 0 ? firstName.charAt(0) : ""
    initials += (lastName.length) ? lastName.charAt(0) : ""

    function getUserTitle() {
        if (!user) {
            return (
                <span className="flex justify-center underline"><span className="my-auto">Login</span><LogIn className="m-0" /></span>
            )
        }

        return (
            <span className="flex justify-center underline"><span className={cn("hidden sm:inline my-auto")} >{fullName}</span><span className={cn("inline sm:hidden my-auto")} >{initials}</span><ChevronDown className="m-0" /></span>
        )
    }

    return (
        <div>
            <p className={cn("text-xs")}>{companyName}</p>
            <hr />
            {getUserTitle()}
        </div>
    )
}

function getUserMenu(props: NavigationBarProps) {

    const organisation = selectAppData(appStore.getState()).organisation
    if (!organisation) return null;

    if (!props.userMenuContent) {
        if (!props.fnValidateUser) return null;
        return (<div className={cn("ms-auto")}>
            <LoginForm validateUser={props.fnValidateUser}
                userMenuTriggerElement={getUserMenuTriggerTitle()}
            />
        </div>)
    }

    return (<div className={cn("ms-auto")}>
        <Menubar className="border-0 contents">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:border-2">
                    <User className="mr-1" />
                    {getUserMenuTriggerTitle()}
                </MenubarTrigger>
                <MenubarPortal >
                    {props.userMenuContent}
                </MenubarPortal>
            </MenubarMenu>
        </Menubar>
    </div>)
}

export type fnValidateUserType = (loginRequest: LoginRequest) => Promise<ResponseData<AppUser | null>>

export interface NavigationBarProps {
    mainMenuContent?: React.JSX.Element | null,
    userMenuContent?: React.JSX.Element | null,
    fnValidateUser?: fnValidateUserType | null,
}
export const NavigationBar = (props: NavigationBarProps) => {
    return (<NavigationMenu className="flex-none block" >
        <div className="flex flex-wrap p-1">
            {getMainMenu(props)}
            <div className={cn("grow m-auto")}>
                <PageTitle />
            </div>
            {getUserMenu(props)}
        </div>
        <hr />
    </NavigationMenu>)

}
