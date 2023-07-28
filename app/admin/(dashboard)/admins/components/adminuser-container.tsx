/*
  import  AdminUserTable from "./adminuser-table"
  import { getAdminUsers } from "../data";
*/

import AdminUserTable from "./adminuser-table"
import { getAdminUsers as serverGetAdminUsers, getColumnConfig as serverGetColumnConfig, saveColumnConfig as serverSaveColumnConfig } from "../data";
import { SortColumn } from "@/lib/types/types"

export default function AdminUsers() {

    async function getAdminUsers(pageIndex: number, pageSize: number, sortColumn: SortColumn[]) {
        'use server'
        return await serverGetAdminUsers(pageIndex, pageSize, sortColumn)
    }

    async function saveColumnConfig(saveForAll: boolean) {
        'use server'
        await serverSaveColumnConfig(saveForAll)
    }

    async function getColumnConfig() {
        'use server'
        return await serverGetColumnConfig()
    }

    return (<AdminUserTable getAdminUsers={getAdminUsers}
        getColumnConfig={getColumnConfig}
        saveColumnConfig={saveColumnConfig}  ></AdminUserTable>)
}
