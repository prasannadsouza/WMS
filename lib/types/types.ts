import { App as AppConstants } from "@/lib/types/constants"
export type ResponseData<T> = {
    data: T | null;
    errors?: ErrorData[] | null;
    pagination?: Pagination | null;
}

export type ErrorData = {
    moduleCode: number,
    errorCode: number,
}

export interface AppUser {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    id: string | null,
    postLoginURL?: string | null,
}

export interface AppCustomer {
    id: string | null,
    name: string | null,
    shortName: string | null,
    postLoginURL?: string | null,
    logoURL?: string | null,
}

export interface Pagination {
    page: number,
    totalRecords: number,
    recordsPerPage: number,
    sortColumns: SortColumn[]
}

export interface SortColumn {
    column: string,
    descending: boolean,
    index: number
}

export interface TableConfig {
    hidden: {
        column: string
    }[],
    sequence: ColumnSequence[],
    sort: SortColumn[],
    pagination: {
        recordsPerPage: number
    },
}

export interface ColumnSequence {
    column: string,
    index: number
}

export function getResponseData<T>(data: T | null) {
    let responseData: ResponseData<T> = {
        data: data,
        errors: [],
        pagination: {
            page: 1,
            totalRecords: 0,
            recordsPerPage: Math.min(...AppConstants.Pagination.pageSizeRange),
            sortColumns: [],
        }
    };

    return responseData;
}

export type fnSaveTableConfig = (tableType: string, tableId: string, tableConfig: TableConfig, forAll: boolean, forDefault: boolean) => Promise<ResponseData<boolean>>
export type fnDeleteSavedTableConfig = (tableType: string, tableId: string, forAll: boolean, forDefault: boolean) => Promise<ResponseData<boolean>>
export type fnGetTableConfig = (tableType: string, tableId: string, forAll: boolean, forDefault: boolean, forceGetDefault: boolean) => Promise<ResponseData<TableConfig>>
export type fnGetData<T> = (page: number, pageSize: number, sortColumn: SortColumn[]) => Promise<ResponseData<T[]>>
