export interface AppUser {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    id: string | null,
    enabled: boolean | null,
    appCustomerId: string | null,
    postLoginURL?: string | null,
}

export interface AppCustomer {
    name: string | null,
    shortName: string | null,
    id: string | null,
    enabled: boolean | null,
    logoURL: string | null,
    postLoginURL?: string | null,
}
