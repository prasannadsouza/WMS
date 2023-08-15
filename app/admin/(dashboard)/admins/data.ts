'use server'
import { faker } from "@faker-js/faker"
/*
import { ResponseData, TableConfig, SortColumn, getResponseData } from "@/lib/types/types"
import { AppUser } from "@/lib/types/admin/types"
import { App as AppConstants } from "@/lib/types/constants"
import { App as AdminConstants } from "@/lib/types/admin/constants"
*/

import { ResponseData, TableConfig, SortColumn, getResponseData } from "@/lib/types/types"
import { AppUser } from "@/lib/types/admin/types"
import { App as AppConstants } from "@/lib/types/constants"
import { App as AdminConstants } from "@/lib/types/admin/constants"

export async function getAdminUsers(page: number, pageSize: number, sortColumn: SortColumn[]) {

    const maxPageSize = Math.max(...AppConstants.Pagination.pageSizeRange)
    if (pageSize > maxPageSize) pageSize = maxPageSize;

    let responseData: ResponseData<AppUser[]> = {
        data: [],
        errors: [],
        pagination: {
            page: page,
            totalRecords: (pageSize * 1000),
            recordsPerPage: pageSize,
            sortColumns: [],
        }
    }

    console.log({
        component: "admin/(dashboard)/admins/data.ts|getAdminUsers",
        pagenumber: page,
        pageSize: pageSize,
        sortColumn,
    })



    for (let i = 0; i < pageSize; i++) {

        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();
        responseData.data!.push({
            id: `${(page * pageSize) + (i + 1)}`,
            firstName: firstName,
            lastName: lastName,
            email: faker.internet.email({
                firstName: firstName,
                lastName: lastName
            }),
            enabled: faker.datatype.boolean()
        });


    }
    return responseData;
}

export async function saveTableConfig(tableType: string, tableId: string, tableConfig: TableConfig, forAll: boolean, forDefault: boolean) {
    console.log({
        component: "admins.data.ts.saveTableConfig",
        tableType,
        tableId,
        tableConfig,
        forAll,
        forDefault,
    })

    return getResponseData<boolean>(true)
}

export async function deleteSavedTableConfig(tableType: string, tableId: string, forAll: boolean, forDefault: boolean) {
    console.log({
        component: "admins.data.ts.deleteSavedTableConfig",
        tableType,
        tableId,
        forAll,
        forDefault,
    })

    return getResponseData<boolean>(true)

}

export async function getTableConfig(tableType: string, tableId: string, forAll: boolean, forDefault: boolean, forceGetDefault: boolean) {
    console.log({
        component: "admins.data.ts.getTableConfig",
        tableType,
        tableId,
        forAll,
        forDefault,
        forceGetDefault
    })
    let responseData: ResponseData<TableConfig> = {
        data: null,
        errors: []
    }

    if (tableType === AdminConstants.tableType.adminUser) {
        responseData.data = {
            hidden: [{ column: "email" }],
            sequence: [
                { column: "enabled", index: 1 },
                { column: "actions", index: 2 },
                { column: "lastName", index: 4 },
                { column: "firstName", index: 4 }],
            sort: [
                { column: "enabled", index: 0, descending: false },
                { column: "firstName", index: 1, descending: true }],
            pagination: {
                recordsPerPage: Math.min(...AppConstants.Pagination.pageSizeRange),
            }
        }
    }

    return responseData
}
