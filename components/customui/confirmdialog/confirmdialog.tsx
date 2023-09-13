'use client'
/*
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { typeUseConfirm } from "@/components/customui/confirmdialog/useConfirm";

*/

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { typeUseConfirm } from "@/components/customui/confirmdialog/useConfirm";

export interface Props {
    useConfirm: typeUseConfirm
}
export function ConfirmDialog({ props }: { props: Props }) {

    const { useConfirm } = props
    const model = useConfirm?.model;
    if (useConfirm?.show !== true) return null;

    return (<AlertDialog open={useConfirm.show === true}>
        <AlertDialogContent>
            <AlertDialogHeader>
                {model?.title?.length ? <AlertDialogTitle>{model?.title}?</AlertDialogTitle> : null}
                {model?.message?.length ?
                    <AlertDialogDescription>
                        {model.message}
                    </AlertDialogDescription> : null}
            </AlertDialogHeader>
            <AlertDialogFooter className='flex justify-between'>
                <AlertDialogCancel className='content' onClick={() => { useConfirm.closeConfirm(false) }}>{model?.cancelTitle}</AlertDialogCancel>
                <AlertDialogAction className='content' onClick={() => { useConfirm.closeConfirm(true) }}>{model?.confirmTitle}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>)
}
