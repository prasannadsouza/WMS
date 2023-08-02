/*
  import  AdminUserTable from "./adminuser-table"
  import { getAdminUsers } from "../data";
*/

import AdminUserTable from "./adminuser-table"
import { getAdminUsers as serverGetAdminUsers, getTableConfig as serverGetTableConfig, saveTableConfig as serverSaveTableConfig } from "../data";
import { SortColumn } from "@/lib/types/types"

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

    async function saveTableConfig(saveForAll: boolean) {
        'use server'
        await serverSaveTableConfig(saveForAll)
    }

    async function getTableConfig() {
        'use server'
        return await serverGetTableConfig()
    }

    return (<AdminUserTable getAdminUsers={getAdminUsers}
        getTableConfig={getTableConfig}
        saveTableConfig={saveTableConfig}
        enableRowSelection={enableRowSelection}
        enableMultiRowSelection={enableMultiRowSelection}
        showActions={showActions}
    ></AdminUserTable>)
}
