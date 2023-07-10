export type ResponseData<T> = {
    data: T | null;
    errors: ErrorData[] | null;
}

export type ErrorData = {
    moduleCode: number,
    errorCode: number,
}

export interface AppUser {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    id: string | null
}
