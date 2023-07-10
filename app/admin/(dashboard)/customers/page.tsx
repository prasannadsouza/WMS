import { appStore } from "@/lib/store/store"
import { AdminCustomerTable } from "@/components/tables/admin-customer-table";
import { appDataSlice } from "@/lib/store/appDataSlice"

/*
import { appStore } from "@/lib/store/store"
import { AdminCustomerTable } from "@/components/tables/admin-customer-table";
import { appDataSlice } from "@/lib/store/appDataSlice"
*/

export default function AdminHome() {
    const { setCurrentTitle } = appDataSlice.actions
    appStore.dispatch(setCurrentTitle("Customers"))

    return (
        <AdminCustomerTable />
    );
}
