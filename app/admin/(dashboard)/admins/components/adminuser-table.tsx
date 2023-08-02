"use client"
/*
import { DataTable } from "@/components/customui/datatable";
import { AppUser } from "@/lib/types/admin/types";
import { adminUserColumns } from "../components/adminuser-columns"
import { ColumnConfig, getResponseData } from "@/lib/types/types";
import { getAdminUsersType, saveColumnConfigType, getColumnConfigType, getColumnConfig } from "../data"
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, getColumnSortingState, getColumnVisibilityState, setColumnSequence } from "@/components/customui/datatable-extensions";

*/

import { DataTable } from "@/components/customui/datatable";
import { AppUser } from "@/lib/types/admin/types";
import { GetAdminUserColumns } from "../components/adminuser-columns"
import { TableConfig, getResponseData, SortColumn } from "@/lib/types/types";
import { getAdminUsersType, saveTableConfigType, getTableConfigType } from "../data"
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, initializeTableState } from "@/components/customui/datatable-extensions";

import React from 'react'
import { PaginationState, Table as TablePrimitive } from '@tanstack/react-table'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

export default function AdminUserTable({
    getAdminUsers,
    getTableConfig,
    saveTableConfig,
    enableRowSelection,
    enableMultiRowSelection,
    showActions }: {
        getAdminUsers: getAdminUsersType,
        getTableConfig: getTableConfigType,
        saveTableConfig?: saveTableConfigType,
        enableRowSelection?: boolean,
        enableMultiRowSelection?: boolean
        showActions?: boolean
    }) {

    const [responseData, setResponseData] = React.useState(getResponseData<AppUser>());
    const mainColumns = React.useMemo(() => GetAdminUserColumns(enableRowSelection, enableMultiRowSelection, showActions), [])

    // const [{ pageIndex, pageSize }, setPagination] =
    //     React.useState<PaginationState>({
    //         pageIndex: 0,
    //         pageSize: Math.min(...AppConstants.Pagination.pageSizeRange),
    //     })

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
            // pagination: {
            //     pageIndex: pageIndex,
            //     pageSize: pageSize,
            // }
        },
        enableRowSelection,
        enableMultiRowSelection,
        onRowSelectionChange: setRowSelection,
        //onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        //getPaginationRowModel: getPaginationRowModel(),
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
            sortChanged: () => {
                if (tableConfig === null) return;
                setIsSortingChanged(true);
                console.log({
                    component: "admintable.customsorting change"
                })
            },
            saveTableConfig: async (table: TablePrimitive<AppUser>, saveForAll: boolean) => {
                //const tableConfig: TableConfig = {

                //}
                console.log({
                    component: "admintable.saveTableConfig",
                    saveForAll,
                })
                saveTableConfig && await saveTableConfig(saveForAll);
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
                const responseData = await getTableConfig();
                const tableConfig = initializeTableState(table, responseData.data)
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
