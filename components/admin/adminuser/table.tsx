"use client"
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"

/*
import { DataTableContainer } from "@/components/customui/datatable/datatablecontainer"
import { AppUser, fnGetAdminUsers } from "@/lib/types/admin/types";
import { getTableColumns, getDefaultTableConfig } from "@/components/admin/adminuser/columns"
import { fnSaveTableConfig as fnServerSaveTableConfig, fnGetTableConfig as fnServerGetTableConfig, fnDeleteSavedTableConfig as fnServerDeleteSavedTableConfig, fnGetData } from "@/lib/types/types"
import { App as AdminConstants } from "@/lib/types/admin/constants"
*/

import { DataTableContainer } from "@/components/customui/datatable/datatablecontainer"
import { AppUser, fnGetAdminUsers } from "@/lib/types/admin/types";
import { getTableColumns, getDefaultTableConfig } from "@/components/admin/adminuser/columns"
import { fnSaveTableConfig as fnServerSaveTableConfig, fnGetTableConfig as fnServerGetTableConfig, fnDeleteSavedTableConfig as fnServerDeleteSavedTableConfig, fnGetData } from "@/lib/types/types"
import { App as AdminConstants } from "@/lib/types/admin/constants"

export interface AdminUserTableProps {
    tableId: string,
    getAdminUsers: fnGetAdminUsers,
    getTableConfig: fnServerGetTableConfig,
    saveTableConfig?: fnServerSaveTableConfig,
    deleteSavedTableConfig?: fnServerDeleteSavedTableConfig
    dataSelectCompleted?: (data: AppUser[]) => void,
    dataSelectCancelled?: () => void,
    enableRowSelection?: boolean,
    enableMultiRowSelection?: boolean,
    showActions?: boolean,
    showConfigOptionsForAll?: boolean,
    showConfigOptionsForDefault?: boolean,
}

export default function AdminUserTable({
    tableId,
    getAdminUsers,
    saveTableConfig,
    deleteSavedTableConfig,
    enableRowSelection,
    enableMultiRowSelection,
    getTableConfig,
    dataSelectCompleted,
    dataSelectCancelled,
    showActions,
    showConfigOptionsForAll,
    showConfigOptionsForDefault, }: AdminUserTableProps) {

    const mainTableColumns = React.useMemo<ColumnDef<AppUser>[]>(() => getTableColumns(enableRowSelection, enableMultiRowSelection, showActions, false), [])
    const selectedTableColumns = React.useMemo<ColumnDef<AppUser>[]>(() => getTableColumns(false, false, false, true), [])

    return <DataTableContainer
        tableType={AdminConstants.tableType.adminUser}
        tableId={tableId}
        idProperty="id"
        getData={getAdminUsers as fnGetData<AppUser>}
        getTableConfig={getTableConfig}
        saveTableConfig={saveTableConfig}
        deleteSavedTableConfig={deleteSavedTableConfig}
        dataSelectCompleted={dataSelectCompleted}
        dataSelectCancelled={dataSelectCancelled}
        enableRowSelection={enableRowSelection}
        enableMultiRowSelection={enableMultiRowSelection}
        getDefaultTableConfig={getDefaultTableConfig}
        showConfigOptionsForAll={showConfigOptionsForAll}
        showConfigOptionsForDefault={showConfigOptionsForDefault}
        mainTableColumns={mainTableColumns}
        selectedTableColumns={selectedTableColumns}
    />

}
