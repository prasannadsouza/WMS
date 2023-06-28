"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import * as ru_menubar from "@radix-ui/react-menubar";
import * as ru_navigationmenu from "@radix-ui/react-navigation-menu"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
    NavigationBar,
    getMenuSeperatorClass,
    getMenuItemClass,
    getMenuContentClass,
    getMenuIconClass,
} from "@/components/ui/navigation-menu"
import { Warehouse, LogOut, Users2, ChevronRight, Settings, Globe, Scroll, Send } from "lucide-react";

export function AdminNav() {
    function getMainMenuContent() {
        return (<ru_menubar.Content className={getMenuContentClass()} align="start" sideOffset={5} alignOffset={-3}>
            <Link href="/admin/admins" legacyBehavior passHref>
                <ru_navigationmenu.NavigationMenuLink>
                    <ru_menubar.Item className={getMenuItemClass()}>
                        <Users2 className={"mr-1"} />
                        Users
                    </ru_menubar.Item>
                </ru_navigationmenu.NavigationMenuLink>
            </Link>
            <Link href="/admin/" legacyBehavior passHref>
                <ru_navigationmenu.NavigationMenuLink>
                    <ru_menubar.Item className={getMenuItemClass()}>
                        <Warehouse className={"mr-1"} />
                        Customers
                    </ru_menubar.Item>
                </ru_navigationmenu.NavigationMenuLink>
            </Link>
            <ru_menubar.Item className={getMenuItemClass()}> New Window{' '}
                <div className={getMenuIconClass()}>⌘ N </div>
            </ru_menubar.Item>
            <ru_menubar.Item className={getMenuItemClass()} disabled>New Incognito Window</ru_menubar.Item>
            <ru_menubar.Separator className={getMenuSeperatorClass()} />
            <ru_menubar.Sub><ru_menubar.SubTrigger className={getMenuItemClass()}>
                Share
                <div className={getMenuIconClass()}> <ChevronRight /> </div>
            </ru_menubar.SubTrigger>
                <ru_menubar.Portal>
                    <ru_menubar.SubContent className={getMenuContentClass()} alignOffset={-5} >
                        <ru_menubar.Item className={getMenuItemClass()}> Email Link </ru_menubar.Item>
                        <ru_menubar.Item className={getMenuItemClass()}>Messages </ru_menubar.Item>
                        <ru_menubar.Item className={getMenuItemClass()}> Notes </ru_menubar.Item>
                    </ru_menubar.SubContent>
                </ru_menubar.Portal>
            </ru_menubar.Sub>
            <ru_menubar.Separator className={getMenuSeperatorClass()} />
            <ru_menubar.Item className={getMenuItemClass()}>Print…{' '}
                <div className={getMenuIconClass()}> ⌘ P </div>
            </ru_menubar.Item>
        </ru_menubar.Content>)
    }

    function getUserMenuContent() {
        return (<ru_menubar.Content className={getMenuContentClass()} align="start" sideOffset={5} alignOffset={-3}>
            <ru_menubar.Item className={getMenuItemClass()}> <Settings className={"mr-1"} />Preferences</ru_menubar.Item>
            <ru_menubar.Item className={getMenuItemClass()}> <Globe className={"mr-1"} />Language</ru_menubar.Item>
            <ru_menubar.Separator className={getMenuSeperatorClass()} />
            <ru_menubar.Item className={getMenuItemClass()}> <Scroll className={"mr-1"} />Help</ru_menubar.Item>
            <ru_menubar.Item className={getMenuItemClass()}> <Send className={"mr-1"} />Support</ru_menubar.Item>
            <ru_menubar.Separator className={getMenuSeperatorClass()} />
            <ru_menubar.Item className={getMenuItemClass()}> <LogOut className="mr-1" /> Logout </ru_menubar.Item>
        </ru_menubar.Content>)
    }

    return (<NavigationBar
        MainMenuContent={getMainMenuContent()}
        UserMenuContent={getUserMenuContent()}
        AppLogoSource="https://apps.jlmdata.se/Content/Images/jlm2-large.png" >
    </NavigationBar>)
}

export function AdminNav1() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/admin" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className="gap-2 flex flex-row items-center">
                                <Warehouse />
                                Customers
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/admin/admins" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className="gap-2 flex flex-row items-center">
                                <Users2 />
                                Admin
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/admin/login" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className="gap-2 flex flex-row items-center">
                                <LogOut />
                                Logout
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
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
