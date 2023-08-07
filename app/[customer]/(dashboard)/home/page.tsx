/*
  import SetPageTitle from '@/components/customui/pagetitle';
import { appStore, selectAppData } from "@/lib/store/store"
 */
import SetPageTitle from '@/components/customui/pagetitle';
import { appStore, selectAppData } from "@/lib/store/store"
export default function Home() {
    const customer = selectAppData(appStore.getState()).organisation;
    return (
        <div>
            <SetPageTitle title={`Customer ${customer!.name} Home`} />
            {`Customer ${customer!.name} Post Login Page (Login Required), Display App Status Information Here Like Health`}
        </div>
    )
}
