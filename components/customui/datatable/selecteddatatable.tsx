import React from 'react'
/*
 import { getCoreRowModel, getSortedRowModel, useReactTable, Table as TablePrimitive, Row as RowPrimitive, getPaginationRowModel, SortingState, ColumnDef } from "@tanstack/react-table"
import { fnSaveTableConfig as fnServerSaveTableConfig, fnGetTableConfig as fnServerGetTableConfig, fnDeleteSavedTableConfig as fnServerDeleteSavedTableConfig } from "@/lib/types/types"
import { DataTable } from "@/components/customui/datatable/datatable";
import { TableConfig } from "@/lib/types/types";
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, initializeTableState, getTableMeta, getTableConfig as getTableConfigFromTable } from "@/components/customui/datatable/extensions";

 */
import { getCoreRowModel, getSortedRowModel, useReactTable, Table as TablePrimitive, Row as RowPrimitive, getPaginationRowModel, SortingState, ColumnDef } from "@tanstack/react-table"
import { fnSaveTableConfig as fnServerSaveTableConfig, fnGetTableConfig as fnServerGetTableConfig, fnDeleteSavedTableConfig as fnServerDeleteSavedTableConfig } from "@/lib/types/types"
import { DataTable } from "@/components/customui/datatable/datatable";
import { TableConfig } from "@/lib/types/types";
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, initializeTableState, getTableMeta, getTableConfig as getTableConfigFromTable } from "@/components/customui/datatable/extensions";

export function SelectedDataTable<T>({
    tableType,
    tableId,
    saveTableConfig,
    deleteSavedTableConfig,
    getTableConfig,
    selectedTableData,
    onShowSelected,
    onSelectedRowsRemoved,
    selectedTableColumns,
    fnGetDefaultTableConfig,
    showConfigOptionsForAll,
    showConfigOptionsForDefault
}: {
    tableType: string,
    tableId: string,
    getTableConfig: fnServerGetTableConfig,
    saveTableConfig?: fnServerSaveTableConfig,
    deleteSavedTableConfig?: fnServerDeleteSavedTableConfig,
    selectedTableData: T[],
    onShowSelected: () => void
    onSelectedRowsRemoved: (removedData: T[]) => void
    selectedTableColumns: ColumnDef<T>[],
    fnGetDefaultTableConfig: () => TableConfig,
    showConfigOptionsForAll?: boolean,
    showConfigOptionsForDefault?: boolean
}) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [tableConfig, setTableConfig] = React.useState<TableConfig | null>(null);

    const selectedTable = useReactTable({
        data: selectedTableData,
        columns: selectedTableColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableMultiSort: true,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: Math.min(...AppConstants.Pagination.pageSizeRange),
            }
        },
        state: {
            sorting,
        },
        meta: {
            tableType: tableType,
            id: tableId,
            showConfigOptionsForAll,
            showConfigOptionsForDefault,
            isTableForSelectedData: true,
            showMainTable: () => {
                onShowSelected();
            },
            saveTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
                saveTableConfig && await saveTableConfig(tableType, tableId, getTableConfigFromTable(table), forAll, forDefault);
            },
            deleteSavedTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
                deleteSavedTableConfig && await deleteSavedTableConfig(tableType, getTableMeta(table).id, forAll, forDefault);
                let tableConfig = initializeTableState(table, fnGetDefaultTableConfig())
                setTableConfig(tableConfig)
            },
            loadSavedTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
                const responseData = await getTableConfig(tableType, getTableMeta(table).id, forAll, forDefault, false);
                let tableConfig = responseData.data;
                if (!tableConfig) tableConfig = fnGetDefaultTableConfig()
                tableConfig = initializeTableState(table, tableConfig)
                setTableConfig(tableConfig)
            },
            onAllRowsDeleted: (table: TablePrimitive<T>) => {
                onSelectedRowsRemoved(table.getRowModel().rows.map((row) => row.original))
            },
            onRowDeleted: (row: RowPrimitive<T>) => {
                onSelectedRowsRemoved([row.original])
            },
            tableConfig: tableConfig,
        } as TableMeta<T>
    })

    React.useEffect(() => {
        if (tableConfig !== null) return;
        (async () => {
            try {
                const responseData = await getTableConfig(tableType, tableId, false, false, true);
                let tableConfig = responseData.data;
                if (!tableConfig) tableConfig = fnGetDefaultTableConfig()
                tableConfig = initializeTableState(selectedTable, tableConfig)
                setTableConfig(tableConfig)
            } catch (err) {
                console.log({ err, message: 'Error occured when fetching data from column config' });
            }
        })();

    }, [tableConfig === null])

    return (<DataTable table={selectedTable} />)
}
