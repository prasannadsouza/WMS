import { cn } from "@/lib/utils"

export const getMenuItemClass = () => {
    return cn("cursor-pointer group text-[15px] leading-none text-slate-700 rounded flex items-center h-[40px] px-[10px] relative select-none outline-none data-[state=open]:bg-slate-400 data-[state=open]:text-slate-600 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-slate-500 data-[highlighted]:to-slate-950 data-[highlighted]:text-slate-100 data-[highlighted]:data-[state=open]:text-slate-100 data-[disabled]:text-slate-300 data-[disabled]:pointer-events-none");
}
