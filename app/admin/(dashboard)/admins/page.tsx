import React from 'react'
/*
import ClientPage from './clientpage';
import SetPageTitle from '@/components/customui/pagetitle';
import { getAdminUsers, getTableConfig, saveTableConfig, deleteSavedTableConfig } from "./data";
import { SortColumn, TableConfig } from "@/lib/types/types"
*/


import ClientPage from './clientpage';
import SetPageTitle from '@/components/customui/pagetitle';
import { getAdminUsers, getTableConfig, saveTableConfig, deleteSavedTableConfig } from "./data";
import { SortColumn, TableConfig } from "@/lib/types/types"

export default function AdminUsersHome() {

    async function localGetAdminUsers(pageIndex: number, pageSize: number, sortColumn: SortColumn[]) {
        'use server'
        return await getAdminUsers(pageIndex, pageSize, sortColumn)
    }

    async function localSaveTableConfig(tableType: string, tableId: string, tableConfig: TableConfig, forAll: boolean, forDefault: boolean) {
        'use server'
        return await saveTableConfig(tableType, tableId, tableConfig, forAll, forDefault)
    }

    async function localDeleteSavedTableConfig(tableType: string, tableId: string, forAll: boolean, forDefault: boolean) {
        'use server'
        return await deleteSavedTableConfig(tableType, tableId, forAll, forDefault)
    }

    async function localGetTableConfig(tableType: string, tableId: string, forAll: boolean, forDefault: boolean, forceGetDefault: boolean) {
        'use server'
        return await getTableConfig(tableType, tableId, forAll, forDefault, forceGetDefault)
    }

    return (
        <div className='pb-2'>
            <SetPageTitle title="Admins" />
            <ClientPage props={{
                getTableConfig: localGetTableConfig,
                saveTableConfig: localSaveTableConfig,
                deleteSavedTableConfig: localDeleteSavedTableConfig,
                getAdminUsers: localGetAdminUsers
            }} />
        </div>
    );
}
