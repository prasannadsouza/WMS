'use client'
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import * as ru_navigationmenu from "@radix-ui/react-navigation-menu"
import * as ru_menubar from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils"
import { User, ChevronDown, Menu } from "lucide-react";
//import {getAppData } from "@/lib/store/store"
import { useAppSelector } from "@/lib/store/store"

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
    return cn("outline-none select-none font-medium leading-none text-[15px] flex items-center justify-between gap-[2px]");
}

function getMenuBarImageSource(customSource: string | null | undefined): string {
    if (customSource && customSource?.length > 0 == true) return customSource;
    return "/vercel.svg"
}

function getPageTitle() {
    return "Page Title";
}

function getUserMenuTitle() {
    return "FirstName LastName"
}

function getMainMenu(props: NavigationBarProps) {

    function getImage() {
        return (<img src={getMenuBarImageSource(props.AppLogoSource)} style={{ width: "70px", height: "50px" }} />)
    }

    if (props.MainMenuContent) {
        return (<ru_menubar.Root className="flex bg-white">
            <ru_menubar.Menu >
                <ru_menubar.Trigger className={getMenuMainIconClass()}>
                    <Menu size="35" />
                    {getImage()}
                </ru_menubar.Trigger>
                <ru_menubar.Portal>
                    {props.MainMenuContent}
                </ru_menubar.Portal>
            </ru_menubar.Menu>
        </ru_menubar.Root>)
    }

    return (<div className="={getMenuMainIconClass()}">
        {getImage()}
    </div>)

}

function getUserMenu(props: NavigationBarProps) {
    if (!props.UserMenuContent) return null

    return (<div className={cn("grow sm:contents text-right p-1")}>
        <ru_menubar.Root className="flex bg-white justify-end">
            <ru_menubar.Menu >
                <ru_menubar.Trigger className={getMenuMainIconClass()}>
                    <User className="mr-1" />
                    {getUserMenuTitle()}
                    <ChevronDown size="20" className="pt-1" />
                </ru_menubar.Trigger>
                <ru_menubar.Portal >
                    {props.UserMenuContent}
                </ru_menubar.Portal>
            </ru_menubar.Menu>
        </ru_menubar.Root>
    </div>)
}

export interface NavigationBarProps {
    MainMenuContent?: React.ReactElement<ru_menubar.MenubarContentProps & React.RefAttributes<HTMLDivElement>> | null;
    UserMenuContent?: React.ReactElement<ru_menubar.MenubarContentProps & React.RefAttributes<HTMLDivElement>> | null;
    AppLogoSource?: string | null | undefined;
}
export const NavigationBar = (props: NavigationBarProps) => {


    let currentTitle = "Page Title"
    currentTitle = useAppSelector((state) => state.AppDataReducer?.currentTitle);

    return (<ru_navigationmenu.NavigationMenu >
        <div className="p-1 flex flex-wrap">
            {getMainMenu(props)}
            <div className={cn("grow text-right sm:text-center p-1")}>{currentTitle}</div>
            {getUserMenu(props)}
        </div>
        <hr className="mb-1 border border-slate-200"></hr>
    </ru_navigationmenu.NavigationMenu >)
}

const NavigationMenu = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
        ref={ref}
        className={cn(
            "relative z-10 flex flex-1 items-center justify-center",
            className
        )}
        {...props}
    >
        {children}
        <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
        ref={ref}
        className={cn(
            "group flex flex-1 list-none items-center justify-center space-x-1",
            className
        )}
        {...props}
    />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10 py-2 px-4 group w-max"
)

const NavigationMenuTrigger = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
        ref={ref}
        className={cn(navigationMenuTriggerStyle(), "group", className)}
        {...props}
    >
        {children}{" "}
        <ChevronDown
            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
        />
    </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
            "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
            className
        )}
        {...props}
    />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
    <div className={cn("absolute left-0 top-full flex justify-center")}>
        <NavigationMenuPrimitive.Viewport
            className={cn(
                "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
                className
            )}
            ref={ref}
            {...props}
        />
    </div>
))
NavigationMenuViewport.displayName =
    NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
        ref={ref}
        className={cn(
            "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
            className
        )}
        {...props}
    >
        <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
    NavigationMenuPrimitive.Indicator.displayName

export {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
}
