'use server'

/*
  import { ResponseData,ColumnConfig,SortColumn } from "@/lib/types/types"
import { AppUser } from "@/lib/types/admin/types"
import { App as AppConstants } from "@/lib/types/constants"

*/

import { faker } from "@faker-js/faker"
import { ResponseData, TableConfig, SortColumn } from "@/lib/types/types"
import { AppUser } from "@/lib/types/admin/types"
import { App as AppConstants } from "@/lib/types/constants"

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

export async function saveTableConfig(tableId: string, tableConfig: TableConfig, saveForAll: boolean) {
    console.log({
        component: "admins.data.ts.saveTableConfig",
        tableId,
        saveForAll,
        tableConfig
    })
}

export async function deleteSavedTableConfig(tableId: string, deleteForAll: boolean) {
    console.log({
        component: "admins.data.ts.deleteSavedTableConfig",
        tableId,
        deleteForAll
    })
}

export async function getTableConfig(tableId: string, forAll: boolean, forceGetForAll: boolean) {
    console.log({
        component: "admins.data.ts.getTableConfig",
        tableId,
        forAll,
        forceGetForAll
    })
    let responseData: ResponseData<TableConfig> = {
        data: {
            hidden: [{ column: "email" }],
            sequence: [{ column: "enabled", index: 1 }, { column: "actions", index: 2 }, { column: "lastName", index: 4 }, { column: "firstName", index: 4 }],
            sort: [{ column: "enabled", index: 0, descending: false }, { column: "firstName", index: 1, descending: true }
            ],
            pagination: {
                recordsPerPage: Math.min(...AppConstants.Pagination.pageSizeRange),
            }
        },
        errors: null
    }
    return responseData
}

export type typeGetAdminUsers = typeof getAdminUsers
export type typeSaveTableConfig = typeof saveTableConfig
export type typeDeleteSavedTableConfig = typeof deleteSavedTableConfig
export type typeGetTableConfig = typeof getTableConfig
