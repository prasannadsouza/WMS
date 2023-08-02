/*
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

import { ColumnMeta, getTableMeta, DataTableConstants } from "@/components/customui/datatable-extensions"
  */
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
    CheckboxIcon,
} from "@radix-ui/react-icons"
import { Column, Table as TablePrimitive, ColumnDef } from "@tanstack/react-table"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

import { ColumnMeta, getTableMeta, DataTableConstants } from "@/components/customui/datatable-extensions"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    table: TablePrimitive<TData>,
    column: Column<TData, TValue>
}

export function DataTableColumnHeader<TData, TValue>({
    table,
    column,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort() && !column.getCanHide()) {
        return <div className={cn(className)}>{(column.columnDef.meta as ColumnMeta)?.title}</div>
    }

    const sortChanged = getTableMeta(table)?.sortChanged;

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="px-1 h-8 data-[state=open]:bg-accent hover:border-2"
                    >
                        <span>{(column.columnDef.meta as ColumnMeta)?.title}</span>
                        {column.getCanSort() && (column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        ))}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {column.getCanSort() && <DropdownMenuItem onClick={() => {
                        column.toggleSorting(false)
                        sortChanged && sortChanged()
                    }}>
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5" />
                        Asc
                    </DropdownMenuItem>}
                    {column.getCanSort() && <DropdownMenuItem onClick={() => {
                        column.toggleSorting(true)
                        sortChanged && sortChanged()
                    }}>
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5" />
                        Desc
                    </DropdownMenuItem>}
                    {column.getCanSort() && <DropdownMenuItem onClick={() => {
                        column.clearSorting()
                        sortChanged && sortChanged()
                    }}>
                        <CaretSortIcon className="mr-2 h-3.5 w-3.5" />
                        No Sort
                    </DropdownMenuItem>}
                    {column.getCanSort() && column.getCanHide() && <DropdownMenuSeparator />}
                    {column.getCanHide() && <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5" />
                        Hide
                    </DropdownMenuItem>}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export function GetDataTableRowSelectionColumn<TData>(enableMultiRowSelection?: boolean) {
    return {
        id: DataTableConstants.select,
        enableSorting: false,
        enableHiding: false,
        meta: {
            title: "Select"
        } as ColumnMeta,
        header: ({ table }) => {
            if (!enableMultiRowSelection) return <div className="flex align-middle justify-center"><CheckboxIcon className="h-6 w-6" /></div>
            return (<div className="flex align-middle justify-center" ><Checkbox
                onCheckedChange={(value: any) =>
                    table.toggleAllRowsSelected(!!value)
                }
                className="h-6 w-6" checked={table.getIsAllRowsSelected()} >
            </Checkbox></div>)
        },
        cell: ({ row, table }) => {
            return (<div className="flex align-middle justify-center">
                <Checkbox checked={row.getIsSelected()}
                    onCheckedChange={(value: any) => {
                        if (value && !enableMultiRowSelection) {
                            table.getSelectedRowModel().rows.map((a) => {
                                a.toggleSelected(false);
                            })
                        }

                        row.toggleSelected(!!value)
                    }
                    }
                    className="h-6 w-6">
                </Checkbox>
            </div>
            )
        },

    } as ColumnDef<TData>
}
