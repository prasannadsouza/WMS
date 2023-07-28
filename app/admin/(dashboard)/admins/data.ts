'use server'

/*
  import { ResponseData,ColumnConfig,SortColumn } from "@/lib/types/types"
import { AppUser } from "@/lib/types/admin/types"
import { App as AppConstants } from "@/lib/types/constants"

*/

import { faker } from "@faker-js/faker"
import { ResponseData, ColumnConfig, SortColumn } from "@/lib/types/types"
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
            totalRecords: 1000,
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

export async function saveColumnConfig(saveForAll: boolean) {
    console.log({
        component: "admins.data.ts.saveColumnConfig",
        saveForAll
    })
}

export async function getColumnConfig() {

    console.log({
        component: "admins.data.ts.getColumnConfig",
    })
    let responseData: ResponseData<ColumnConfig> = {
        data: {
            hidden: [{ column: "email" }],
            sequence: [{ column: "enabled", index: 0 }, { column: "actions", index: 1 }, { column: "lastName", index: 2 }, { column: "firstName", index: 4 }],
            sort: [{ column: "enabled", index: 0, descending: false }, { column: "firstName", index: 1, descending: true }
            ]
        },
        errors: null
    }
    return responseData
}

export type getAdminUsersType = typeof getAdminUsers
export type saveColumnConfigType = typeof saveColumnConfig
export type getColumnConfigType = typeof getColumnConfig
