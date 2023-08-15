'use client'
/*
import AdminUserTable from "@/components/admin/adminuser/table"
import { fnSaveTableConfig as fnServerSaveTableConfig, fnGetTableConfig as fnServerGetTableConfig, fnDeleteSavedTableConfig as fnServerDeleteSavedTableConfig, SortColumn } from "@/lib/types/types"
import { fnGetAdminUsers, } from "@/lib/types/admin/types"
*/

import AdminUserTable from "@/components/admin/adminuser/table"
import { fnSaveTableConfig as fnServerSaveTableConfig, fnGetTableConfig as fnServerGetTableConfig, fnDeleteSavedTableConfig as fnServerDeleteSavedTableConfig, SortColumn } from "@/lib/types/types"
import { fnGetAdminUsers, } from "@/lib/types/admin/types"
export default function ClientPage(
    {
        saveTableConfig,
        getTableConfig,
        deleteSavedTableConfig,
        getAdminUsers }:
        {
            getTableConfig: fnServerGetTableConfig,
            saveTableConfig?: fnServerSaveTableConfig,
            deleteSavedTableConfig?: fnServerDeleteSavedTableConfig,
            getAdminUsers: fnGetAdminUsers
        }) {

    function localGetAdminUsers(pageIndex: number, pageSize: number, sortColumn: SortColumn[]) {
        return getAdminUsers(pageIndex, pageSize, sortColumn)
    }

    return (<AdminUserTable getAdminUsers={localGetAdminUsers}
        tableId={"adminusersmainpage"}
        getTableConfig={getTableConfig}
        saveTableConfig={saveTableConfig}
        deleteSavedTableConfig={deleteSavedTableConfig}
        enableRowSelection={true}
        enableMultiRowSelection={true}
        showActions={true}
        showConfigOptionsForAll={true}
        showConfigOptionsForDefault={true}
    ></AdminUserTable>)
}
