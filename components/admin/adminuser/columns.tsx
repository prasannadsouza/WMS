"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, ColumnDef } from "@tanstack/react-table"

/*
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { AppUser } from "@/lib/types/admin/types"
import { DataTableColumnHeader, GetDataTableRowSelectionColumn, GetDataTableRowDeleteColumn } from "@/components/customui/datatable/columnheader"
import { ColumnMeta, DataTableConstants } from "@/components/customui/datatable/extensions"
import { TableConfig } from "@/lib/types/types"
import { App as AppConstants } from "@/lib/types/constants"
*/

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { AppUser } from "@/lib/types/admin/types"
import { DataTableColumnHeader, GetDataTableRowSelectionColumn, GetDataTableRowDeleteColumn } from "@/components/customui/datatable/columnheader"
import { ColumnMeta, DataTableConstants } from "@/components/customui/datatable/extensions"
import { TableConfig } from "@/lib/types/types"
import { App as AppConstants } from "@/lib/types/constants"
interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export const AdminUserConstants =
{
    id: "id",
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    enabled: "enabled"
}

export function getDefaultTableConfig() {
    let tableConfig: TableConfig = {
        sequence: [],
        sort: [],
        hidden: [],
        pagination: {
            recordsPerPage: Math.min(...AppConstants.Pagination.pageSizeRange)
        }
    }

    let index: number = 0;
    tableConfig.sequence.push({ column: DataTableConstants.select, index: index++ })
    tableConfig.sequence.push({ column: AdminUserConstants.id, index: index++ })
    tableConfig.sequence.push({ column: AdminUserConstants.firstName, index: index++ })
    tableConfig.sequence.push({ column: AdminUserConstants.lastName, index: index++ })
    tableConfig.sequence.push({ column: AdminUserConstants.email, index: index++ })
    tableConfig.sequence.push({ column: AdminUserConstants.enabled, index: index++ })
    tableConfig.sequence.push({ column: DataTableConstants.actions, index: index++ })
    tableConfig.sequence.push({ column: DataTableConstants.delete, index: index++ })

    index = 0
    tableConfig.sort.push({ column: AdminUserConstants.enabled, descending: false, index: index++ })
    tableConfig.sort.push({ column: AdminUserConstants.firstName, descending: false, index: index++ })

    return tableConfig;
}

export function getTableColumns<AppUser>(
    enableRowSelection?: boolean, enableMultiRowSelection?: boolean, showActions?: boolean, showDeleteRow?: boolean
) {
    let columns: ColumnDef<AppUser>[] = [
        {
            id: AdminUserConstants.id,
            accessorKey: AdminUserConstants.id,
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
            id: AdminUserConstants.firstName,
            accessorKey: AdminUserConstants.firstName,
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
                        {row.getValue(AdminUserConstants.firstName)}
                    </span>
                )
            },

        },
        {
            id: AdminUserConstants.lastName,
            accessorKey: AdminUserConstants.lastName,
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
                        {row.getValue(AdminUserConstants.lastName)}
                    </span>
                )
            },

        },
        {
            id: AdminUserConstants.email,
            accessorKey: AdminUserConstants.email,
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
                        {row.getValue(AdminUserConstants.email)}
                    </span>
                )
            },

            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            id: AdminUserConstants.enabled,
            accessorKey: AdminUserConstants.enabled,
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
                        {row.getValue(AdminUserConstants.enabled) ? "Yes" : "No"}
                    </span>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },]

    if (showActions) {
        columns.push(
            {
                id: DataTableConstants.actions,
                enableSorting: false,
                enableHiding: false,
                meta: {
                    title: "Actions"
                } as ColumnMeta,
                cell: ({ row }) => <DataTableRowActions row={row} />,
            })
    }

    if (enableRowSelection || enableMultiRowSelection) columns.splice(0, 0, GetDataTableRowSelectionColumn(enableMultiRowSelection))

    if (showDeleteRow) columns.push(GetDataTableRowDeleteColumn())

    return columns;
}


function DataTableRowActions<TData>({
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
