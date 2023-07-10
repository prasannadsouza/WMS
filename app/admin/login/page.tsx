import { LoginForm } from "@/components/forms/login";
import { appStore } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"

export default function LoginPage() {
    const { setCurrentTitle } = appDataSlice.actions
    appStore.dispatch(setCurrentTitle("WMS"))
    console.log(
        { Component: 'admin/login/page', LogPoint: 'start' }
    )
    return (
        <div className="grid place-content-center w-full h-screen">
            <LoginForm />
        </div>
    );
}
