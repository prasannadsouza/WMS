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

export interface ColumnConfig {
    hidden: {
        column: string
    }[],
    sequence: {
        column: string,
        index: number
    }[],
    sort: SortColumn[]
}

export function getResponseData<T>() {
    let responseData: ResponseData<T[]> = {
        data: [],
        errors: [],
        pagination: {
            page: 1,
            totalRecords: 0,
            recordsPerPage: 20,
            sortColumns: [],
        }
    };

    return responseData;
}
