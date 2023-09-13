'use client'

/*
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { fnValidateUserType } from "@/components/navs/navigationbar";
import { ErrorData } from "@/lib/types/types"
import { errorCodes } from "@/lib/types/errorcodes"
import { FormInput, FormInputHandle } from "@/components/customui/forminput"
*/
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { fnValidateUserType } from "@/components/navs/navigationbar";
import { ErrorData } from "@/lib/types/types"
import { errorCodes } from "@/lib/types/errorcodes"
import { FormInput, FormInputHandle } from "@/components/customui/forminput"
import { X } from "lucide-react";
import React from 'react'
import { useRouter } from 'next/navigation'

export interface LoginFormProps {
    validateUser: fnValidateUserType,
    userMenuTriggerElement: JSX.Element,
}
export default function LoginForm(props: LoginFormProps) {
    let [isPending, startTransition] = React.useTransition();
    const refUsername = React.useRef<FormInputHandle>(null);
    const refPassword = React.useRef<FormInputHandle>(null);

    function getInitialModel() {
        return {
            isLoginSuccess: false,
            postLoginURL: "/",
        }
    }

    const [model, setModel] = React.useState(getInitialModel());
    const router = useRouter()

    function clearErrors() {
        refPassword?.current?.setError("");
        refUsername?.current?.setError("");
    }

    function onOpenChange(open: boolean) {
        if (open) clearErrors();
    }

    function loginHasErrors(errors?: ErrorData[] | null) {
        if (!(errors?.length)) return false

        let unhandledErrors: ErrorData[] = [];

        for (var error of errors) {
            switch (error.errorCode) {
                case errorCodes.username_cannotbe_blank: {
                    refUsername?.current?.setError("Please provide username");
                    refUsername?.current?.setFocus();
                    break;
                }
                case errorCodes.password_cannotbe_blank: {
                    refPassword?.current?.setError("Please provide password");
                    refPassword?.current!.setFocus();
                    break;
                }
                case errorCodes.username_or_password_isinvalid: {
                    refUsername?.current?.setError("Username or password is invalid");
                    refUsername?.current?.setFocus();
                    break;
                }
                default: {
                    unhandledErrors.push(error)
                    break;
                }
            }
        }

        if (unhandledErrors.length > 0) alert(`An unknon error occcurred. ErrorCode: ${unhandledErrors[0].errorCode}`)
        return true;
    }

    async function submitLogin() {

        let hasError = false;
        let focusSet = true;

        console.log({
            component: "loginform!submitlogin",
            username: refUsername.current?.getValue(),
            password: refPassword.current?.getValue(),
        })

        refUsername?.current?.setError("");
        if (!refUsername.current!.getValue().length) {
            refUsername?.current?.setError("Please provide username");
            refUsername?.current?.setFocus();
            focusSet = true;
            hasError = true;
        }

        refPassword?.current?.setError("");
        if (!refPassword.current!.getValue().length) {
            refPassword?.current?.setError("Please provide password");
            if (!focusSet) {
                refPassword?.current!.setFocus();
                focusSet = true;
            }
            hasError = true
        }

        if (hasError) return;

        const response = await props.validateUser({
            userName: refUsername.current!.getValue(),
            password: refPassword.current!.getValue(),
        })

        if (loginHasErrors(response.errors)) {
            return;
        }
        setModel({ ...model, isLoginSuccess: true, postLoginURL: response!.data!.postLoginURL! });
    }

    React.useEffect(() => {
        if (model.isLoginSuccess) {
            setModel(getInitialModel())
            router.push(model.postLoginURL)
        }
    }, [model.isLoginSuccess]);

    return (
        <AlertDialog onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button variant="link" className="hover:no-underline hover:border-2 py-0.5 h-fit" >
                    {props.userMenuTriggerElement}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-2 rounded gap-1" onOpenAutoFocus={(event: Event) => {
                if (refUsername?.current) {
                    refUsername.current.setFocus();
                    event.preventDefault();
                }
            }} >
                <AlertDialogHeader className=" flex items-end">
                    <AlertDialogCancel className="px-2 py-1 mt-0 hover:border-2">
                        <X className="h-6 w-6" />
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <div>
                    <FormInput ref={refUsername} inputType={"text"} title="Username" minWidth={"200px"} />
                    <FormInput ref={refPassword} inputType={"password"} title="Password" minWidth={"200px"} containerClassName="mt-2" />
                </div>
                <AlertDialogFooter className="block">
                    <div className="flex flex-wrap justify-end">
                        <div className="grow">
                            <Button variant="link" className="underline px-1 py-1" >Forgot Password</Button>
                        </div>
                        <Button className="h-9" onClick={async () => startTransition(async () => await submitLogin())}>Login</Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
