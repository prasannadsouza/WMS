'use client'
import React from "react"
/*
import AdminUserTable from "@/components/admin/adminuser/table"
import { fnSaveTableConfig, fnGetTableConfig, fnDeleteSavedTableConfig, SortColumn } from "@/lib/types/types"
import { fnGetAdminUsers, } from "@/lib/types/admin/types"
import useConfirm from "@/components/customui/confirmdialog/useConfirm"
import { ConfirmDialog } from "@/components/customui/confirmdialog/confirmdialog"
import useMessage from "@/components/customui/messagedialog/usemessage"
import { MessageDialog } from "@/components/customui/messagedialog/messagedialog"
*/

import AdminUserTable from "@/components/admin/adminuser/table"
import { fnSaveTableConfig, fnGetTableConfig, fnDeleteSavedTableConfig, SortColumn } from "@/lib/types/types"
import { fnGetAdminUsers, } from "@/lib/types/admin/types"
import useConfirm from "@/components/customui/confirmdialog/useConfirm"
import { ConfirmDialog } from "@/components/customui/confirmdialog/confirmdialog"
import useMessage from "@/components/customui/messagedialog/usemessage"
import { MessageDialog } from "@/components/customui/messagedialog/messagedialog"

interface Props {
    getTableConfig: fnGetTableConfig,
    saveTableConfig?: fnSaveTableConfig,
    deleteSavedTableConfig?: fnDeleteSavedTableConfig,
    getAdminUsers: fnGetAdminUsers
}

export default function ClientPage({ props }: { props: Props }) {
    const confirm = useConfirm()
    const message = useMessage()

    function localGetAdminUsers(pageIndex: number, pageSize: number, sortColumn: SortColumn[]) {
        return props.getAdminUsers(pageIndex, pageSize, sortColumn)
    }
    return (<div>
        <AdminUserTable
            props={{
                getAdminUsers: localGetAdminUsers,
                containerProps: {
                    tableId: "adminusersmainpage",
                    getTableConfig: props.getTableConfig,
                    saveTableConfig: props.saveTableConfig,
                    deleteSavedTableConfig: props.deleteSavedTableConfig,
                    enableRowSelection: true,
                    enableMultiRowSelection: true,
                    showActions: true,
                    showConfigOptionsForAll: true,
                    showConfigOptionsForDefault: true,
                },
                commonDialogProps: {
                    useConfirm: confirm,
                    useMessage: message,
                }
            }}
        />
        <ConfirmDialog props={{ useConfirm: confirm }} />
        <MessageDialog props={{ useMessage: message }} />
    </div>
    )
}
