import React from "react";
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable, Table as TablePrimitive, Row as RowPrimitive, RowSelectionState } from "@tanstack/react-table"

/*
import { TableConfig, ResponseData, getResponseData } from "@/lib/types/types";
import { TableMeta, initializeTableState, getTableMeta, getPageCount, getTableSortConfig, getTableConfig as getTableConfigFromTable } from "@/components/customui/datatable/extensions";
import { App as AppConstants } from "@/lib/types/constants"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/customui/datatable/datatable";
import { SelectedDataTable } from "@/components/customui/datatable/selecteddatatable";
import { CommonDialogProps, DataTableContainerProps, DataTableProps } from '@/lib/types/props';
 */
import { TableConfig, ResponseData, getResponseData } from "@/lib/types/types";
import { TableMeta, initializeTableState, getTableMeta, getPageCount, getTableSortConfig, getTableConfig as getTableConfigFromTable } from "@/components/customui/datatable/extensions";
import { App as AppConstants } from "@/lib/types/constants"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/customui/datatable/datatable";
import { SelectedDataTable } from "@/components/customui/datatable/selecteddatatable";
import { CommonDialogProps, DataTableContainerProps, DataTableProps } from '@/lib/types/props';

export interface Props<T> {
    containerProps: DataTableContainerProps<T>
    tableProps: DataTableProps<T>,
    commonDialogProps: CommonDialogProps,
}

export function DataTableContainer<T>({ props }: { props: Props<T> }) {

    const { containerProps, tableProps } = props
    const [tableResponseData, setTableResponseData] = React.useState<ResponseData<T[]>>(getResponseData<T[]>([]));
    const [tableRowSelection, setTableRowSelection] = React.useState({})
    const [tableColumnFilters, setTableColumnFilters] = React.useState<ColumnFiltersState>([])
    const [isMainTableSortingChanged, setMainTableIsSortingChanged] = React.useState(false)
    const [tableConfig, setTableConfig] = React.useState<TableConfig | null>(null);
    const [showSelected, setShowSelected] = React.useState(false)
    const [selectedTableData, setSelectedTableData] = React.useState<T[]>([])
    const [isDataLoaded, setIsDataLoaded] = React.useState(false)

    const getValue = (property: string, data: any) => data[property]

    const tableMeta: TableMeta<T> = {
        tableType: tableProps.tableType,
        id: containerProps.tableId,
        showConfigOptionsForAll: containerProps.showConfigOptionsForAll,
        showConfigOptionsForDefault: containerProps.showConfigOptionsForDefault,
        isTableForSelectedData: false,
        enableRowSelection: containerProps.enableRowSelection,
        enableMultiRowSelection: containerProps.enableMultiRowSelection,
        sortChanged: () => {
            if (tableConfig === null) return;
            setMainTableIsSortingChanged(true);
        },
        saveTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
            const tableMeta = getTableMeta(table)
            containerProps.saveTableConfig && await containerProps.saveTableConfig(tableMeta.tableType, tableMeta.id, getTableConfigFromTable(table), forAll, forDefault);
        },
        deleteSavedTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
            const tableMeta = getTableMeta(table)
            containerProps.deleteSavedTableConfig && await containerProps.deleteSavedTableConfig(tableMeta.tableType, tableMeta.id, forAll, forDefault);
            let tableConfig = initializeTableState(table, tableProps.getDefaultTableConfig())
            setTableConfig(tableConfig)
            setMainTableIsSortingChanged(true)
        },
        loadSavedTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
            const tableMeta = getTableMeta(table)
            const responseData = await containerProps.getTableConfig(tableMeta.tableType, tableMeta.id, forAll, forDefault, false);
            let tableConfig = responseData.data;
            if (!tableConfig) tableConfig = tableProps.getDefaultTableConfig()
            tableConfig = initializeTableState(table, tableConfig)
            setTableConfig(tableConfig)
            setMainTableIsSortingChanged(true)
        },
        showSelectedTable: () => {
            setShowSelected(true);
        },
        onSelectedRowRemoved: (rows: RowPrimitive<T>[]) => {
            rows.forEach((row) => {
                const index = selectedTableData.findIndex((a) => getValue(tableProps.idProperty, a) === getValue(tableProps.idProperty, row.original))
                if (index >= 0) selectedTableData.splice(index, 1)
            })
            setSelectedTableData(selectedTableData)
        },
        onSelectedRowAdded: (rows: RowPrimitive<T>[]) => {
            rows.forEach((row) => {
                const index = selectedTableData.findIndex((a) => getValue(tableProps.idProperty, a) === getValue(tableProps.idProperty, row.original))
                if (index >= 0) {
                    selectedTableData.splice(index, 1, row.original)
                }
                else {
                    selectedTableData.push(row.original)
                }
            })

            setSelectedTableData(selectedTableData)
        },
        tableConfig: tableConfig,
    }

    const table = useReactTable({
        data: tableResponseData.data ?? [],
        columns: tableProps.mainTableColumns,
        state: {
            rowSelection: tableRowSelection,
            columnFilters: tableColumnFilters,
        },
        enableRowSelection: containerProps.enableRowSelection,
        enableMultiRowSelection: containerProps.enableMultiRowSelection,
        onRowSelectionChange: setTableRowSelection,
        onColumnFiltersChange: setTableColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        enableMultiSort: true,
        manualSorting: true,
        pageCount: getPageCount(tableResponseData.pagination?.recordsPerPage ?? 0, tableResponseData.pagination?.totalRecords ?? 0),

        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: tableResponseData.pagination?.recordsPerPage ?? Math.min(...AppConstants.Pagination.pageSizeRange),
            }
        },
        meta: tableMeta
    })

    React.useEffect(() => {
        if (tableConfig === null) return;
        localGetData();
    }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize])

    React.useEffect(() => {
        if (!isMainTableSortingChanged) return;
        if (tableConfig === null) return;
        setMainTableIsSortingChanged(false);
        localGetData();

    }, [isMainTableSortingChanged])

    React.useEffect(() => {
        if (!isDataLoaded) return;

        if (containerProps.enableRowSelection) {
            const rows = table.getRowModel().rows as RowPrimitive<T>[]
            const rowSelectionState: RowSelectionState = {};

            rows.forEach((row) => {
                const index = selectedTableData.findIndex((a) => getValue(tableProps.idProperty, a) === getValue(tableProps.idProperty, row.original))
                if (index >= 0) {
                    selectedTableData.splice(index, 1, row.original)
                    rowSelectionState[row.id] = true;
                }
            })
            setTableRowSelection(rowSelectionState)
        }
        setIsDataLoaded(false);

    }, [isDataLoaded])


    React.useEffect(() => {
        if (tableConfig !== null) return;
        (async () => {
            try {

                const responseData = await containerProps.getTableConfig(tableMeta.tableType, tableMeta.id, false, false, true);
                let tableConfig = responseData.data;
                if (!tableConfig) tableConfig = tableProps.getDefaultTableConfig()
                tableConfig = initializeTableState(table, tableConfig)
                setTableConfig(tableConfig)
                setMainTableIsSortingChanged(true)
            } catch (err) {
                console.log({ err, message: 'Error occured when fetching data from column config' });
            }
        })();

    }, [tableConfig === null])

    function localGetData() {
        (async () => {
            try {
                const responseData = await tableProps.getData(table.getState().pagination.pageIndex, table.getState().pagination.pageSize, getTableSortConfig(table));
                setTableResponseData(responseData)
                setIsDataLoaded(true);
            } catch (err) {
                console.log('Error occured when fetching data');
            }
        })();
    }

    function selectedDataRemoved(removedData: T[]) {
        const finalData = selectedTableData.filter((a) => {
            const matched = removedData.find((b) => getValue(tableProps.idProperty, b) == getValue(tableProps.idProperty, a))
            return (!matched)
        })
        setSelectedTableData(finalData)
        setIsDataLoaded(true);
    }

    return (<div >
        <div className={showSelected ? "" : "hidden"}><SelectedDataTable
            props={{
                tableProps: {
                    tableType: tableProps.tableType,
                    tableId: `${containerProps.tableId}_selected`,
                    saveTableConfig: containerProps.saveTableConfig,
                    deleteSavedTableConfig: containerProps.deleteSavedTableConfig,
                    getTableConfig: containerProps.getTableConfig,
                    tableData: [...selectedTableData],
                    onShowSelected: () => setShowSelected(false),
                    onSelectedRowsRemoved: selectedDataRemoved,
                    tableColumns: tableProps.selectedTableColumns,
                    getDefaultTableConfig: tableProps.getDefaultTableConfig,
                },
                commonDialogProps: props.commonDialogProps
            }} />
        </div>
        <div className={showSelected ? "hidden" : ""}>
            <DataTable props={{ table: table, commonDialogProps: props.commonDialogProps }} />
        </div>
        {containerProps.enableRowSelection &&
            <div>
                <hr className='mt-2' />
                <div className="flex justify-between p-0.5 mt-1">
                    <div>
                        <Button onClick={() => {
                            containerProps.dataSelectCancelled && containerProps.dataSelectCancelled()
                        }} variant="outline" className={"h-8 px-5 py-0.5 rounded hover:border-2 grow"} >Cancel</Button>
                    </div>
                    <div>
                        {selectedTableData.length > 0 &&
                            <Button onClick={() => {
                                containerProps.dataSelectCompleted && containerProps.dataSelectCompleted(selectedTableData)
                            }} variant="outline" className={" h-8 px-5 py-0.5 rounded hover:border-2 grow"} >Select</Button>}
                    </div>
                </div>
            </div>}
    </div>)
}
