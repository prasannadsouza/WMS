export type Auth = {
    userName: string,
    password: string,
}

export type AppUser = {
    firstName: string | null,
    lastName: string | null
}

export type ForgotPassword = {
    email: string
}
