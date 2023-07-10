import { appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice, } from "@/lib/store/appDataSlice"
import { AdminNav } from "@/components/navs/admin-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { setCompanyName } = appDataSlice.actions
    appStore.dispatch(setCompanyName("Customer"))

    return (
        <div className="w-full h-full">
            <AdminNav />
            <div>
                {selectAppData(appStore.getState()).companyName}
            </div>
            <div className="px-4 pt-4">
                {children}
            </div>
        </div>
    );
}
