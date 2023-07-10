'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useRef, useTransition, useState, useEffect } from 'react';

export default function FormInput(
    {
        title,
        error,
        minWidth,
        onTextChange,
        refInput,
        inputType,
        containerClassName,
    }:
        {
            title: string,
            error?: string | null,
            minWidth: number,
            onTextChange: (value: string) => void,
            refInput: React.RefObject<HTMLInputElement>;
            inputType: string,
            containerClassName?: string,
        }) {


    function getInitialModel() {
        return {
            inputValue: ""
        }
    }


    const [model, setModel] = useState(getInitialModel());

    function getTextInputClass() {
        let className = "mt-1 block w-full p-1 h-8 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 rounded m-0 peer   ..."
        if (error?.length) return className;
        return className += " invalid border-red-500";
    }

    function getClearButtonClass() {
        let className = "inline-flex flex-shrink-0 justify-center items-center rounded border border-transparent text-current  bg-transparent hover:text-current hover:bg-transparent  font-semibold text-sm px-2 h-8 py-0 m-0 invisible";
        if (refInput.current?.value?.length) className += " visible"
        return className;
    }

    function getErrorLabel() {
        let className = "block text-xs text-red-500 mt-1 invisible";
        if (error?.length) className += " visible"
        return (<Label className={cn(className)}>{error}</Label>)
    }

    function onClearButtonClick() {
        refInput.current!.value = ""
        setModel({ ...model, inputValue: "" });
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setModel({ ...model, inputValue: value });
        onTextChange(value);
    };

    const handleGetInputValue = () => {
        const value = refInput.current?.value || '';
        return value;
    };

    return (<div className={containerClassName} style={{ minWidth: `${minWidth}px` }}>
        <Label className="block">{title}</Label>
        <div>
            <div className="flex rounded border-2">
                <Input type={inputType} ref={refInput} value={model.inputValue} onChange={handleChange} className={(getTextInputClass())} />
                <Button type="button" className={getClearButtonClass()} onClick={() => onClearButtonClick()} >
                    <X size={15} />
                </Button>
            </div>
            {getErrorLabel()}
        </div>
    </div>)
}
