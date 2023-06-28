import { AdminNav, AdminNav1 } from "@/components/navs/admin-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full">
            <AdminNav />
            <AdminNav1 />
            <div className="px-4 pt-4">
                {children}
            </div>
        </div>
    );
}
