import React from 'react'
import { ColumnFiltersState, getFilteredRowModel, getCoreRowModel, getSortedRowModel, useReactTable, Table as TablePrimitive, Row as RowPrimitive, getPaginationRowModel, SortingState, ColumnDef } from "@tanstack/react-table"
/*
import { DataTable } from "@/components/customui/datatable/datatable";
import { TableConfig } from "@/lib/types/types";
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, initializeTableState,  getTableConfig as getTableConfigFromTable } from "@/components/customui/datatable/extensions";
import { CommonDialogProps, SelectedDataTableProps } from '@/lib/types/props';
 */
import { DataTable } from "@/components/customui/datatable/datatable";
import { TableConfig } from "@/lib/types/types";
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, initializeTableState, getTableConfig as getTableConfigFromTable } from "@/components/customui/datatable/extensions";
import { CommonDialogProps, SelectedDataTableProps } from '@/lib/types/props';

export interface Props<T> {
    tableProps: SelectedDataTableProps<T>
    commonDialogProps: CommonDialogProps,
}

export function SelectedDataTable<T>({ props, }: { props: Props<T> }) {
    const { tableProps } = props
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [tableColumnFilters, setTableColumnFilters] = React.useState<ColumnFiltersState>([])
    const [tableConfig, setTableConfig] = React.useState<TableConfig | null>(null);

    const tableMeta: TableMeta<T> = {
        tableType: tableProps.tableType,
        id: tableProps.tableId,
        showConfigOptionsForAll: tableProps.showConfigOptionsForAll,
        showConfigOptionsForDefault: tableProps.showConfigOptionsForDefault,
        isTableForSelectedData: true,
        showMainTable: () => {
            tableProps.onShowSelected();
        },
        saveTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
            tableProps.saveTableConfig && await tableProps.saveTableConfig(tableProps.tableType, tableProps.tableId, getTableConfigFromTable(table), forAll, forDefault);
        },
        deleteSavedTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
            tableProps.deleteSavedTableConfig && await tableProps.deleteSavedTableConfig(tableProps.tableType, tableProps.tableId, forAll, forDefault);
            let tableConfig = initializeTableState(table, tableProps.getDefaultTableConfig())
            setTableConfig(tableConfig)
        },
        loadSavedTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
            const responseData = await tableProps.getTableConfig(tableProps.tableType, tableProps.tableId, forAll, forDefault, false);
            let tableConfig = responseData.data;
            if (!tableConfig) tableConfig = tableProps.getDefaultTableConfig()
            tableConfig = initializeTableState(table, tableConfig)
            setTableConfig(tableConfig)
        },
        onAllRowsDeleted: (table: TablePrimitive<T>) => {
            tableProps.onSelectedRowsRemoved(table.getRowModel().rows.map((row) => row.original))
        },
        onRowDeleted: (row: RowPrimitive<T>) => {
            tableProps.onSelectedRowsRemoved([row.original])
        },
        tableConfig: tableConfig,
    }

    const selectedTable = useReactTable({
        data: tableProps.tableData,
        columns: tableProps.tableColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableMultiSort: true,
        onColumnFiltersChange: setTableColumnFilters,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: Math.min(...AppConstants.Pagination.pageSizeRange),
            }
        },
        state: {
            sorting,
            columnFilters: tableColumnFilters,
        },
        meta: tableMeta
    })

    React.useEffect(() => {
        if (tableConfig !== null) return;
        (async () => {
            try {
                const responseData = await tableProps.getTableConfig(tableProps.tableType, tableProps.tableId, false, false, true);
                let tableConfig = responseData.data;
                if (!tableConfig) tableConfig = tableProps.getDefaultTableConfig()
                tableConfig = initializeTableState(selectedTable, tableConfig)
                setTableConfig(tableConfig)
            } catch (err) {
                console.log({ err, message: 'Error occured when fetching data from column config' });
            }
        })();

    }, [tableConfig === null])

    return (<DataTable
        props={{
            table: selectedTable,
            commonDialogProps: props.commonDialogProps
        }} />)
}
