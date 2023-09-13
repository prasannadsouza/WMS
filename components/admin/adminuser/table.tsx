"use client"
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"

/*
import { DataTableContainer } from "@/components/customui/datatable/datatablecontainer"
import { AppUser, fnGetAdminUsers } from "@/lib/types/admin/types";
import { getTableColumns, getDefaultTableConfig } from "@/components/admin/adminuser/columns"
import { SortColumn } from "@/lib/types/types"
import { App as AdminConstants } from "@/lib/types/admin/constants"
import { CommonDialogProps, DataTableContainerProps }  from '@/lib/types/props';
*/

import { DataTableContainer, Props as dtcProps } from "@/components/customui/datatable/datatablecontainer"
import { AppUser, fnGetAdminUsers } from "@/lib/types/admin/types";
import { getTableColumns, getDefaultTableConfig } from "@/components/admin/adminuser/columns"
import { SortColumn } from "@/lib/types/types"
import { App as AdminConstants } from "@/lib/types/admin/constants"
import { CommonDialogProps, DataTableContainerProps } from '@/lib/types/props';

export interface Props {
    getAdminUsers: fnGetAdminUsers,
    containerProps: DataTableContainerProps<AppUser>,
    commonDialogProps: CommonDialogProps,
}

export default function AdminUserTable({ props }: { props: Props }) {
    const mainTableColumns = React.useMemo<ColumnDef<AppUser>[]>(() => getTableColumns(props.containerProps.enableRowSelection, props.containerProps.enableMultiRowSelection, props.containerProps.showActions, false), [])
    const selectedTableColumns = React.useMemo<ColumnDef<AppUser>[]>(() => getTableColumns(false, false, false, true), [])

    function localGetAdminUsers(pageIndex: number, pageSize: number, sortColumn: SortColumn[]) {
        return props.getAdminUsers(pageIndex, pageSize, sortColumn)
    }

    return (<DataTableContainer
        props={{
            containerProps: props.containerProps,
            commonDialogProps: props.commonDialogProps,
            tableProps: {
                idProperty: "id",
                mainTableColumns: mainTableColumns,
                selectedTableColumns: selectedTableColumns,
                tableType: AdminConstants.tableType.adminUser,
                getDefaultTableConfig: getDefaultTableConfig,
                getData: localGetAdminUsers
            }
        } as dtcProps<AppUser>}
    />)

}
