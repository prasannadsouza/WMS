'use client'

/*
  import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
 */
import { Button } from "@/components/ui/button"

import { useEffect, useState, useTransition } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton({
    performLogout,
    rootURL
}:
    {
        performLogout: () => Promise<void>;
        rootURL: string
    }) {

    function getInitialModel() {
        return {
            isLoggedOut: false,
            rootURL: rootURL,
        }
    }

    let [model, setModel] = useState(getInitialModel());
    let [isPending, startTransition] = useTransition();
    const router = useRouter()


    useEffect(() => {
        if (model.isLoggedOut) router.push(model.rootURL);
    }, []);

    async function doLogout() {
        await performLogout();
        setModel({ ...model, isLoggedOut: true });
    }

    return (
        <div>
            <Button variant="link" className="flex justify-start w-full px-2 py-1 cursor-pointer hover:border-2"
                onClick={async () => startTransition(async () => await doLogout())}>
                <LogOut />
                <span className="ps-1" >Logout</span>
            </Button>
        </div>

    )

}
