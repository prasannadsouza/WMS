"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, ColumnDef } from "@tanstack/react-table"

/*
  import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"


    import { userSchema,User } from "../data"
import { DataTableColumnHeader } from "./adminuser-columnheader"
    */

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AppUser } from "@/lib/types/admin/types"
import { DataTableColumnHeader } from "@/components/customui/datatable-columnheader"
import { ColumnMeta } from "@/components/customui/datatable-extensions"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}


export const adminUserColumns: ColumnDef<AppUser>[] = [
    {
        accessorKey: "id",
        enableSorting: true,
        enableHiding: false,
        meta: {
            title: "Id"
        } as ColumnMeta,
        header: ({ table, column }) => (
            <DataTableColumnHeader table={table} column={column} title="Id" />
        ),

    },
    {
        accessorKey: "firstName",
        enableSorting: true,
        enableHiding: false,
        meta: {
            title: "First Name"
        } as ColumnMeta,
        header: ({ table, column }) => (
            <DataTableColumnHeader table={table} column={column} title="First Name" />
        ),
        cell: ({ row }) => {
            return (
                <span>
                    {row.getValue("firstName")}
                </span>
            )
        },

    },
    {
        accessorKey: "lastName",
        enableSorting: true,
        enableHiding: false,
        meta: {
            title: "Last Name"
        } as ColumnMeta,
        header: ({ table, column }) => (
            <DataTableColumnHeader table={table} column={column} title="Last Name " />
        ),
        cell: ({ row }) => {
            return (
                <span>
                    {row.getValue("lastName")}
                </span>
            )
        },

    },
    {
        accessorKey: "email",
        enableSorting: true,
        enableHiding: true,
        meta: {
            title: "Email"
        } as ColumnMeta,
        header: ({ table, column }) => (
            <DataTableColumnHeader table={table} column={column} />
        ),
        cell: ({ row }) => {
            return (
                <span>
                    {row.getValue("email")}
                </span>
            )
        },

        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "enabled",
        enableSorting: true,
        enableHiding: true,
        meta: {
            title: "Enabled"
        } as ColumnMeta,
        header: ({ table, column }) => (
            <DataTableColumnHeader table={table} column={column} />
        ),
        cell: ({ row }) => {
            return (
                <span>
                    {row.getValue("enabled") ? "Yes" : "No"}
                </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        meta: {
            title: "Actions"
        } as ColumnMeta,
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]


export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const user = row.original as AppUser

    const getBoolValue = (value?: boolean | null) => value === true ? "1" : "0";


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-full w-full p-0.5 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Make a copy</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={getBoolValue(user.enabled)}>
                            <DropdownMenuRadioItem key={getBoolValue(true)} value={getBoolValue(true)}>
                                Enabled
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem key={getBoolValue(false)} value={getBoolValue(false)}>
                                Disabled
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
