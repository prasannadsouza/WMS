import { typeUseConfirm } from "@/components/customui/confirmdialog/useConfirm"
import { typeUseMessage } from "@/components/customui/messagedialog/usemessage"
import { fnSaveTableConfig, fnGetTableConfig, fnDeleteSavedTableConfig, fnGetData, TableConfig } from "@/lib/types/types"
import { ColumnDef } from "@tanstack/react-table"

export interface CommonDialogProps {
    useConfirm?: typeUseConfirm,
    useMessage?: typeUseMessage
    useLoader?: unknown
}

export interface DataTableContainerProps<T> {
    tableId: string,
    getTableConfig: fnGetTableConfig,
    saveTableConfig?: fnSaveTableConfig,
    deleteSavedTableConfig?: fnDeleteSavedTableConfig,
    enableRowSelection?: boolean,
    enableMultiRowSelection?: boolean,
    showActions?: boolean,
    showConfigOptionsForAll?: boolean,
    showConfigOptionsForDefault?: boolean,
    dataSelectCompleted?: (data: T[]) => void,
    dataSelectCancelled?: () => void,
}

export interface DataTableProps<T> {
    getData: fnGetData<T>,
    getDefaultTableConfig: () => TableConfig,
    mainTableColumns: ColumnDef<T>[],
    selectedTableColumns: ColumnDef<T>[],
    tableType: string,
    idProperty: string,
}

export interface SelectedDataTableProps<T> {
    tableType: string,
    tableId: string,
    getTableConfig: fnGetTableConfig,
    saveTableConfig?: fnSaveTableConfig,
    deleteSavedTableConfig?: fnDeleteSavedTableConfig,
    tableData: T[],
    onShowSelected: () => void
    onSelectedRowsRemoved: (removedData: T[]) => void
    tableColumns: ColumnDef<T>[],
    getDefaultTableConfig: () => TableConfig,
    showConfigOptionsForAll?: boolean,
    showConfigOptionsForDefault?: boolean,
}
