import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getOrgURL(orgId: string, urlpart: string) {
    return `/${orgId}/${urlpart}`;
}
