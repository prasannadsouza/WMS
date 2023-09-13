import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { typeUseMessage, } from "@/components/customui/messagedialog/usemessage";

export interface Props {
    useMessage: typeUseMessage
}

export function MessageDialog({ props }: { props: Props }) {

    const { useMessage } = props
    const model = useMessage?.model;
    if (useMessage?.show !== true) return null;

    return (<AlertDialog open={useMessage.show === true}>
        <AlertDialogContent>
            <AlertDialogHeader>
                {model?.title?.length ? <AlertDialogTitle>{model?.title}?</AlertDialogTitle> : null}
                {model?.message?.length ?
                    <AlertDialogDescription>
                        {model.message}
                    </AlertDialogDescription> : null}
            </AlertDialogHeader>
            <AlertDialogFooter className='flex justify-between'>
                <AlertDialogCancel className='content' onClick={() => { useMessage.closeMessage() }}>{model?.okTitle}</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>)
}
