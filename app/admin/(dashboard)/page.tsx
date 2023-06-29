'use client'
import { AdminCustomerTable } from "@/components/tables/admin-customer-table";
//import { appDataSlice } from "../../../lib/store/appDataSlice"
//import { useAppDispatch } from "../../../lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { useAppDispatch } from "@/lib/store/store"

export default function AdminHome() {
    const { setCurrentTitle } = appDataSlice.actions
    const dispatch = useAppDispatch()
    dispatch(setCurrentTitle("Customers"))
    return (
        <>
            <AdminCustomerTable />
        </>
    );
}
