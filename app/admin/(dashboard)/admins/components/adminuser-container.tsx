/*
import AdminUserTable from "./adminuser-table"
import { getAdminUsers as serverGetAdminUsers, getTableConfig as serverGetTableConfig, saveTableConfig as serverSaveTableConfig, deleteSavedTableConfig as serverDeleteSavedTableConfig } from "../data";
import { SortColumn, TableConfig } from "@/lib/types/types"
*/

import AdminUserTable from "./adminuser-table"
import { getAdminUsers as serverGetAdminUsers, getTableConfig as serverGetTableConfig, saveTableConfig as serverSaveTableConfig, deleteSavedTableConfig as serverDeleteSavedTableConfig } from "../data";
import { SortColumn, TableConfig } from "@/lib/types/types"
const tableId = "adminusersmainpage";
export default function AdminUsers(
    { enableRowSelection,
        enableMultiRowSelection,
        showActions }:
        {
            enableRowSelection?: boolean,
            enableMultiRowSelection?: boolean
            showActions?: boolean
        }) {

    async function getAdminUsers(pageIndex: number, pageSize: number, sortColumn: SortColumn[]) {
        'use server'
        return await serverGetAdminUsers(pageIndex, pageSize, sortColumn)
    }

    async function saveTableConfig(tableId: string, tableConfig: TableConfig, saveForAll: boolean) {
        'use server'
        await serverSaveTableConfig(tableId, tableConfig, saveForAll)
    }

    async function deleteSavedTableConfig(tableId: string, deleteForAll: boolean) {
        'use server'
        await serverDeleteSavedTableConfig(tableId, deleteForAll)
    }

    async function getTableConfig(tableId: string, forAll: boolean, forceGetForAll: boolean) {
        'use server'
        return await serverGetTableConfig(tableId, forAll, forceGetForAll)
    }

    return (<AdminUserTable getAdminUsers={getAdminUsers}
        tableId={tableId}
        getTableConfig={getTableConfig}
        saveTableConfig={saveTableConfig}
        deleteSavedTableConfig={deleteSavedTableConfig}
        enableRowSelection={enableRowSelection}
        enableMultiRowSelection={enableMultiRowSelection}
        showActions={showActions}
    ></AdminUserTable>)
}
