'use client'

/*
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { fnValidateUserType } from "@/components/navs/navigationbar";
import { ErrorData } from "@/lib/types/types"
import { errorCodes } from "@/lib/types/errorcodes"
*/
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { fnValidateUserType } from "@/components/navs/navigationbar";
import { ErrorData } from "@/lib/types/types"
import { errorCodes } from "@/lib/types/errorcodes"
import FormInput from "@/components/customui/forminput"
import { X } from "lucide-react";
import { useRef, useTransition, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default function LoginForm({
    validateUser,
    userMenuTriggerElement,
    postLoginURL }:
    {
        validateUser: fnValidateUserType,
        userMenuTriggerElement: JSX.Element
        postLoginURL: string
        ;
    }) {
    let [isPending, startTransition] = useTransition();

    function getInitialModel() {
        return {
            refUsername: useRef<HTMLInputElement>(null),
            refPassword: useRef<HTMLInputElement>(null),
            userNameValue: "",
            passwordValue: "",
            userNameError: "",
            passwordError: "",
            validateUser: validateUser,
            userMenuTriggerElement: userMenuTriggerElement,
            postLoginURL: postLoginURL,
            isLoginSuccess: false,
        }
    }

    const [model, setModel] = useState(getInitialModel());
    const router = useRouter()

    useEffect(() => {
        router.push(model.postLoginURL)
    }, [model.isLoginSuccess === true]);

    function clearErrors() {
        setModel({ ...model, userNameError: "", passwordError: "" });
    }

    function onOpenChange(open: boolean) {
        if (open) clearErrors();
    }


    function loginHasErrors(errors: ErrorData[] | null) {
        if (!(errors?.length)) return false

        let unhandledErrors: ErrorData[] = [];
        let errorHandled = false;

        for (var error of errors) {
            switch (error.errorCode) {
                case errorCodes.username_cannotbe_blank: {
                    model.userNameError = "Please provide username x";
                    model.refUsername.current!.focus();
                    errorHandled = true;
                    break;
                }
                case errorCodes.password_cannotbe_blank: {
                    model.passwordError = "Please provide password x";
                    model.refUsername.current!.focus();
                    errorHandled = true;
                    break;
                }
                case errorCodes.username_or_password_isinvalid: {
                    model.userNameError = "Username or password is invalid"
                    model.refUsername.current!.focus();
                    errorHandled = true;
                    break;
                }
                default: {
                    unhandledErrors.push(error)
                    break;
                }
            }
        }

        if (errorHandled) {
            setModel({
                ...model,
                userNameError: model.userNameError,
                passwordError: model.passwordError
            });
            return true;
        }

        if (unhandledErrors.length > 0) alert(`An unknon error occcurred. ErrorCode: ${unhandledErrors[0].errorCode}`)
        return true;
    }

    async function submitLogin() {



        let hasError = false;

        model.userNameError = ""
        if (!model.refUsername.current!.value.length) {
            model.userNameError = "Please provide username";
            hasError = true;
        }

        model.passwordError = ""
        if (!model.refPassword.current!.value.length) {
            model.passwordError = "Please provide password"
            hasError = true
        }

        if (hasError) {
            setModel({
                ...model,
                userNameError: model.userNameError,
                passwordError: model.passwordError
            });
            return;
        }

        const response = await model.validateUser({
            userName: model.refUsername.current!.value,
            password: model.refPassword.current!.value
        })

        if (loginHasErrors(response.errors)) return;
        clearErrors();
        setModel({ ...model, isLoginSuccess: true });
    }

    function onUserNameChange(value: string) {

    }

    function onPasswordChange(value: string) {

    }

    return (
        <AlertDialog onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button variant="link">
                    {model.userMenuTriggerElement}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-2 rounded gap-1">
                <AlertDialogHeader className=" flex items-end">
                    <AlertDialogCancel className="h-9 mt-0">
                        <X />
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <div>
                    <FormInput inputType={"text"} title="Username" minWidth={200} onTextChange={onUserNameChange} refInput={model.refUsername} error={model.userNameError} />
                    <FormInput inputType={"password"} title="Password" minWidth={200} onTextChange={onPasswordChange} refInput={model.refPassword} error={model.passwordError} containerClassName="mt-2" />
                </div>
                <AlertDialogFooter className="block">
                    <div className="flex flex-wrap justify--end">
                        <div className="grow">
                            <Button variant="link" className="underline" >Forgot Password</Button>
                        </div>
                        <Button className="h-9" onClick={async () => startTransition(async () => await submitLogin())}>Login</Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
