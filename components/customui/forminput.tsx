'use client'
import { X } from "lucide-react"
import React from 'react';
/*
  import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"


export interface FormInputProps {
    title: string,
    initialValue?: string,
    minWidth: number | string
    maxWidth?: number | string | undefined,
    onTextChange?: (value: string) => void,
    onValueCleared?: () => void,
    onBlur?: () => void,
    inputType: string,
    containerClassName?: string,
}

export type FormInputHandle = {
    getValue: () => string,
    setValue: (value: string) => void,
    setError: (error: string) => void,
    setFocus: () => void,
}

const FormInput = React.forwardRef((props: FormInputProps, ref) => {

    const refInput = React.useRef<HTMLInputElement>(null);

    function getInitialModel() {
        return {
            error: "",
        }
    }

    const [model, setModel] = React.useState(getInitialModel());

    React.useImperativeHandle(ref, () => {
        return {
            getValue: () => refInput?.current?.value || '',
            setValue: (value: string) => setValue(value),
            setError: (error: string) => setError(error),
            setFocus: () => refInput?.current?.focus(),
        }
    }, [])


    function setValue(value: string) {
        refInput.current!.value = value;
    }

    function setError(error: string) {
        setModel({ ...model, error: error })
    }

    function getTextInputClass() {
        let className = "mt-1 block w-full p-1 py-0 h-7 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 rounded m-0 peer appearance-none  ..."
        if (model.error?.length) return className;
        return className += " invalid border-red-500";
    }

    function getClearButtonClass() {
        let className = "inline-flex flex-shrink-0 justify-center items-center rounded border border-transparent text-current  bg-transparent hover:text-current hover:bg-transparent  font-semibold text-sm px-2 h-7 y-0 m-0 invisible";
        if (refInput.current?.value?.length) className += " visible"
        return className;
    }

    function getErrorLabel() {
        let className = "block text-xs text-red-500 mt-1";
        if (!model.error?.length) className += " hidden"
        return (<Label className={cn(className)}>{model.error}</Label>)
    }

    function onClearButtonClick() {
        refInput.current!.value = ""
        setModel({ ...model, error: "" });
        if (props.onValueCleared) props.onValueCleared();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setModel({ ...model, error: "" });
        if (props.onTextChange) props.onTextChange(value);
    };

    return (<div className={props.containerClassName} style={{
        minWidth: props.minWidth,
        maxWidth: props.maxWidth
    }}>
        <Label className="block text-xs">{props.title}</Label>
        <div>
            <div className="flex rounded border">
                <Input defaultValue={props.initialValue} type={props.inputType} ref={refInput} onChange={handleChange} className={(getTextInputClass())} onBlur={() => { if (props.onBlur) props.onBlur() }} />
                <Button tabIndex={-1} type="button" className={getClearButtonClass()} onClick={() => onClearButtonClick()} >
                    <X size={15} />
                </Button>
            </div>
            {getErrorLabel()}
        </div>
    </div>)
})

export { FormInput }
