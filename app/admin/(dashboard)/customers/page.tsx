import { AdminCustomerTable } from "@/components/tables/admin-customer-table";
import SetPageTitle from '@/components/customui/pagetitle';
/*
import { appStore } from "@/lib/store/store"
import { AdminCustomerTable } from "@/components/tables/admin-customer-table";
import { appDataSlice } from "@/lib/store/appDataSlice"
import SetPageTitle from '@/components/customui/pagetitle';
*/

export default function AdminHome() {
    return (
        <div>
            <SetPageTitle title=" Customers" />
            <AdminCustomerTable />
        </div>
    );
}
