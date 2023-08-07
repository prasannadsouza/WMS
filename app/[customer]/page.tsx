/*
import { CustomerRoute } from "@/lib/route-params";
import SetPageTitle from '@/components/customui/pagetitle'
  */
import { CustomerRoute } from "@/lib/route-params";
import SetPageTitle from '@/components/customui/pagetitle'
export default function CustomerHome({ params: { customer } }: CustomerRoute) {
    return (
        <div>
            <SetPageTitle title={"WMS"} />
            {"Customer Home Page (No Login Required, Display General Information Here for " + customer}
        </div>
    )
}
