import React from "react";
import { ColumnFiltersState, getCoreRowModel, useReactTable, Table as TablePrimitive, Row as RowPrimitive, RowSelectionState, ColumnDef } from "@tanstack/react-table"

/*
import { fnSaveTableConfig as fnServerSaveTableConfig, fnGetTableConfig as fnServerGetTableConfig, fnDeleteSavedTableConfig as fnServerDeleteSavedTableConfig, fnGetData as fnServerGetData } from "@/lib/types/types"
import { TableConfig, ResponseData, getResponseData } from "@/lib/types/types";
import { TableMeta, initializeTableState, getTableMeta, getPageCount, getTableSortConfig, getTableConfig as getTableConfigFromTable } from "@/components/customui/datatable/extensions";
import { App as AppConstants } from "@/lib/types/constants"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/customui/datatable/datatable";
import { SelectedDataTable } from "@/components/customui/datatable/selecteddatatable";
 */
import { fnSaveTableConfig as fnServerSaveTableConfig, fnGetTableConfig as fnServerGetTableConfig, fnDeleteSavedTableConfig as fnServerDeleteSavedTableConfig, fnGetData as fnServerGetData } from "@/lib/types/types"
import { TableConfig, ResponseData, getResponseData } from "@/lib/types/types";
import { TableMeta, initializeTableState, getTableMeta, getPageCount, getTableSortConfig, getTableConfig as getTableConfigFromTable } from "@/components/customui/datatable/extensions";
import { App as AppConstants } from "@/lib/types/constants"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/customui/datatable/datatable";
import { SelectedDataTable } from "@/components/customui/datatable/selecteddatatable";

export function DataTableContainer<T>({
    tableType,
    tableId,
    idProperty,
    getData,
    getTableConfig,
    saveTableConfig,
    deleteSavedTableConfig,
    dataSelectCompleted,
    dataSelectCancelled,
    enableRowSelection,
    enableMultiRowSelection,
    getDefaultTableConfig,
    showConfigOptionsForAll,
    showConfigOptionsForDefault,
    mainTableColumns,
    selectedTableColumns,
}: {
    tableType: string,
    tableId: string,
    idProperty: string,
    getData: fnServerGetData<T>,
    getTableConfig: fnServerGetTableConfig,
    saveTableConfig?: fnServerSaveTableConfig,
    deleteSavedTableConfig?: fnServerDeleteSavedTableConfig,
    dataSelectCompleted?: (data: T[]) => void,
    dataSelectCancelled?: () => void,
    enableRowSelection?: boolean,
    enableMultiRowSelection?: boolean,
    getDefaultTableConfig: () => TableConfig,
    showConfigOptionsForAll?: boolean,
    showConfigOptionsForDefault?: boolean,
    mainTableColumns: ColumnDef<T>[],
    selectedTableColumns: ColumnDef<T>[],
}) {

    const [tableResponseData, setTableResponseData] = React.useState<ResponseData<T[]>>(getResponseData<T[]>([]));
    const [tableRowSelection, setTableRowSelection] = React.useState({})
    const [tableColumnFilters, setTableColumnFilters] = React.useState<ColumnFiltersState>([])
    const [isMainTableSortingChanged, setMainTableIsSortingChanged] = React.useState(false)
    const [tableConfig, setTableConfig] = React.useState<TableConfig | null>(null);
    const [showSelected, setShowSelected] = React.useState(false)
    const [selectedTableData, setSelectedTableData] = React.useState<T[]>([])
    const [isDataLoaded, setIsDataLoaded] = React.useState(false)

    const getValue = (property: string, data: any) => data[property]

    const table = useReactTable({
        data: tableResponseData.data ?? [],
        columns: mainTableColumns,
        state: {
            rowSelection: tableRowSelection,
            columnFilters: tableColumnFilters,
        },
        enableRowSelection,
        enableMultiRowSelection,
        onRowSelectionChange: setTableRowSelection,
        onColumnFiltersChange: setTableColumnFilters,
        getCoreRowModel: getCoreRowModel(),
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
        meta: {
            tableType,
            id: tableId,
            showConfigOptionsForAll,
            showConfigOptionsForDefault,
            isTableForSelectedData: false,
            enableRowSelection,
            enableMultiRowSelection,
            sortChanged: () => {
                if (tableConfig === null) return;
                setMainTableIsSortingChanged(true);
            },
            saveTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
                saveTableConfig && await saveTableConfig(tableType, tableId, getTableConfigFromTable(table), forAll, forDefault);
            },
            deleteSavedTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
                deleteSavedTableConfig && await deleteSavedTableConfig(tableType, getTableMeta(table).id, forAll, forDefault);
                let tableConfig = initializeTableState(table, getDefaultTableConfig())
                setTableConfig(tableConfig)
                setMainTableIsSortingChanged(true)
            },
            loadSavedTableConfig: async (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => {
                const responseData = await getTableConfig(tableType, getTableMeta(table).id, forAll, forDefault, false);
                let tableConfig = responseData.data;
                if (!tableConfig) tableConfig = getDefaultTableConfig()
                tableConfig = initializeTableState(table, tableConfig)
                setTableConfig(tableConfig)
                setMainTableIsSortingChanged(true)
            },
            showSelectedTable: () => {
                setShowSelected(true);
            },
            onSelectedRowRemoved: (rows: RowPrimitive<T>[]) => {
                rows.forEach((row) => {
                    const index = selectedTableData.findIndex((a) => getValue(idProperty, a) === getValue(idProperty, row.original))
                    if (index >= 0) selectedTableData.splice(index, 1)
                })
                setSelectedTableData(selectedTableData)
            },
            onSelectedRowAdded: (rows: RowPrimitive<T>[]) => {
                rows.forEach((row) => {
                    const index = selectedTableData.findIndex((a) => getValue(idProperty, a) === getValue(idProperty, row.original))
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
        } as TableMeta<T>
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

        if (enableRowSelection) {
            const rows = table.getRowModel().rows as RowPrimitive<T>[]
            const rowSelectionState: RowSelectionState = {};

            rows.forEach((row) => {
                const index = selectedTableData.findIndex((a) => getValue(idProperty, a) === getValue(idProperty, row.original))
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
                const responseData = await getTableConfig(tableType, tableId, false, false, true);
                let tableConfig = responseData.data;
                if (!tableConfig) tableConfig = getDefaultTableConfig()
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
                const responseData = await getData(table.getState().pagination.pageIndex, table.getState().pagination.pageSize, getTableSortConfig(table));
                setTableResponseData(responseData)
                setIsDataLoaded(true);
            } catch (err) {
                console.log('Error occured when fetching data');
            }
        })();
    }

    function selectedDataRemoved(removedData: T[]) {
        const finalData = selectedTableData.filter((a) => {
            const matched = removedData.find((b) => getValue(idProperty, b) == getValue(idProperty, a))
            return (!matched)
        })
        setSelectedTableData(finalData)
        setIsDataLoaded(true);
    }

    return (<div >
        <div className={showSelected ? "" : "hidden"}><SelectedDataTable
            tableType={tableType}
            tableId={`${tableId}_selected`}
            saveTableConfig={saveTableConfig}
            deleteSavedTableConfig={deleteSavedTableConfig}
            getTableConfig={getTableConfig}
            selectedTableData={[...selectedTableData]}
            onShowSelected={() => setShowSelected(false)}
            onSelectedRowsRemoved={selectedDataRemoved}
            selectedTableColumns={selectedTableColumns}
            fnGetDefaultTableConfig={getDefaultTableConfig}
        />
        </div>
        <div className={showSelected ? "hidden" : ""}>
            <DataTable table={table} />
        </div>
        {enableRowSelection &&
            <div>
                <hr className='mt-2' />
                <div className="flex justify-between p-0.5 mt-1">
                    <div>
                        <Button onClick={() => {
                            dataSelectCancelled && dataSelectCancelled()
                        }} variant="outline" className={"h-8 px-5 py-0.5 rounded hover:border-2 grow"} >Cancel</Button>
                    </div>
                    <div>
                        {selectedTableData.length > 0 &&
                            <Button onClick={() => {
                                dataSelectCompleted && dataSelectCompleted(selectedTableData)
                            }} variant="outline" className={" h-8 px-5 py-0.5 rounded hover:border-2 grow"} >Select</Button>}
                    </div>
                </div>
            </div>}
    </div>)
}
