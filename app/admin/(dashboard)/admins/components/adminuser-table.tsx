"use client"
/*
import { DataTable } from "@/components/customui/datatable";
import { AppUser } from "@/lib/types/admin/types";
import { getTableColumns, getDefaultTableConfig } from "../components/adminuser-columns"
import { TableConfig, getResponseData, SortColumn } from "@/lib/types/types";
import { typeGetAdminUsers, typeSaveTableConfig, typeGetTableConfig, typeDeleteSavedTableConfig } from "../data"
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, initializeTableState, getTableMeta } from "@/components/customui/datatable-extensions";

*/

import { DataTable } from "@/components/customui/datatable";
import { AppUser } from "@/lib/types/admin/types";
import { getTableColumns, getDefaultTableConfig } from "../components/adminuser-columns"
import { TableConfig, getResponseData, SortColumn } from "@/lib/types/types";
import { typeGetAdminUsers, typeSaveTableConfig, typeGetTableConfig, typeDeleteSavedTableConfig } from "../data"
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, initializeTableState, getTableMeta } from "@/components/customui/datatable-extensions";

import React from 'react'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    Table as TablePrimitive

} from "@tanstack/react-table"

export default function AdminUserTable({
    tableId,
    getAdminUsers,
    getTableConfig,
    saveTableConfig,
    deleteSavedTableConfig,
    enableRowSelection,
    enableMultiRowSelection,
    showActions }: {
        tableId: string,
        getAdminUsers: typeGetAdminUsers,
        getTableConfig: typeGetTableConfig,
        saveTableConfig?: typeSaveTableConfig,
        deleteSavedTableConfig?: typeDeleteSavedTableConfig
        enableRowSelection?: boolean,
        enableMultiRowSelection?: boolean
        showActions?: boolean
    }) {

    const [responseData, setResponseData] = React.useState(getResponseData<AppUser>());
    const mainColumns = React.useMemo(() => getTableColumns(enableRowSelection, enableMultiRowSelection, showActions), [])
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [isSortingChanged, setIsSortingChanged] = React.useState(false)
    const [tableConfig, setTableConfig] = React.useState<TableConfig | null>(null);

    const table = useReactTable({
        data: responseData.data ?? [],
        columns: mainColumns,
        state: {
            rowSelection,
            columnFilters,
        },
        enableRowSelection,
        enableMultiRowSelection,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: true,
        enableMultiSort: true,
        manualSorting: true,
        pageCount: responseData.pagination?.totalRecords ? 1000 : 0,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: Math.min(...AppConstants.Pagination.pageSizeRange),
            }
        },
        meta: {
            id: tableId,
            sortChanged: () => {
                if (tableConfig === null) return;
                setIsSortingChanged(true);
                console.log({
                    component: "admintable.customsorting change"
                })
            },
            saveTableConfig: async (table: TablePrimitive<AppUser>, tableConfig: TableConfig, saveForAll: boolean) => {
                console.log({
                    component: "admintable.saveTableConfig",
                    saveForAll,
                })
                saveTableConfig && await saveTableConfig(getTableMeta(table).id, tableConfig, saveForAll);
            },
            deleteSavedTableConfig: async (table: TablePrimitive<AppUser>, deleteForAll: boolean) => {
                console.log({
                    component: "admintable.deleteTableConfig",
                    deleteForAll,
                })
                deleteSavedTableConfig && await deleteSavedTableConfig(getTableMeta(table).id, deleteForAll);
                let tableConfig = initializeTableState(table, getDefaultTableConfig())
                setTableConfig(tableConfig)
                setIsSortingChanged(true)
            },
            loadSavedTableConfig: async (table: TablePrimitive<AppUser>, forAll: boolean) => {
                console.log({
                    component: "admintable.loadTableConfig",
                    forAll,
                })
                const responseData = await getTableConfig(getTableMeta(table).id, forAll, false);
                let tableConfig = responseData.data;
                if (!tableConfig) tableConfig = getDefaultTableConfig()
                tableConfig = initializeTableState(table, tableConfig)
                setTableConfig(tableConfig)
                setIsSortingChanged(true)
            },
            tableConfig: tableConfig,
        } as TableMeta<AppUser>
    })

    React.useEffect(() => {
        const sortColumns = table.getState().sorting.map((state, index) => {
            return {
                column: state.id,
                descending: state.desc,
                index: index,
            } as SortColumn
        });

        if (tableConfig === null) return;
        (async () => {
            try {
                const responseData = await getAdminUsers(table.getState().pagination.pageIndex, table.getState().pagination.pageSize, sortColumns);
                if (enableRowSelection) table.toggleAllRowsSelected(false);
                setResponseData(responseData)
            } catch (err) {
                console.log('Error occured when fetching data');
            }
        })();
    }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize])

    React.useEffect(() => {
        if (!isSortingChanged) return;
        const sortColumns = table.getState().sorting.map((state, index) => {
            return {
                column: state.id,
                descending: state.desc,
                index: index,
            } as SortColumn
        });
        console.log({
            component: "adminusertable.sortingchanged.useffect",
            tablesorting: table.getState().sorting,
            sortColumns
        });

        if (tableConfig === null) return;
        setIsSortingChanged(false);

        (async () => {
            try {
                const responseData = await getAdminUsers(table.getState().pagination.pageIndex, table.getState().pagination.pageSize, sortColumns);
                setResponseData(responseData)
            } catch (err) {
                console.log('Error occured when fetching data');
            }
        })();

    }, [isSortingChanged])

    React.useEffect(() => {
        if (tableConfig !== null) return;
        console.log({
            component: "adminusertable.useffect.settingcolumnconfig",

        });
        (async () => {
            try {
                const responseData = await getTableConfig(tableId, false, true);
                let tableConfig = responseData.data;
                if (!tableConfig) tableConfig = getDefaultTableConfig()
                tableConfig = initializeTableState(table, tableConfig)
                setTableConfig(tableConfig)
                setIsSortingChanged(true)
            } catch (err) {
                console.log({ err, message: 'Error occured when fetching data from column config' });
            }
        })();

    }, [tableConfig === null])


    return (
        <DataTable table={table} />
    );
}
