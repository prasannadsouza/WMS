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
import { adminUserColumns } from "../components/adminuser-columns"
import { ColumnConfig, getResponseData, SortColumn } from "@/lib/types/types";
import { getAdminUsersType, saveColumnConfigType, getColumnConfigType, getColumnConfig } from "../data"
import { App as AppConstants } from "@/lib/types/constants"
import { TableMeta, getColumnSortingState, getColumnVisibilityState, setColumnSequence } from "@/components/customui/datatable-extensions";

import React from 'react'
import { PaginationState } from '@tanstack/react-table'
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

export default function AdminUserTable({ getAdminUsers, saveColumnConfig }: {
    getAdminUsers: getAdminUsersType,
    getColumnConfig: getColumnConfigType,
    saveColumnConfig?: saveColumnConfigType
}) {

    const [responseData, setResponseData] = React.useState(getResponseData<AppUser>());
    const mainColumns = React.useMemo(() => adminUserColumns, [])

    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: Math.min(...AppConstants.Pagination.pageSizeRange),
        })

    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [isSortingChanged, setIsSortingChanged] = React.useState(false)
    const [columnConfig, setColumnConfig] = React.useState<ColumnConfig | null>(null);

    const table = useReactTable({
        data: responseData.data ?? [],
        columns: mainColumns,
        state: {
            rowSelection,
            columnFilters,
            //columnVisibility: columnVisibility,
            pagination: {
                pageIndex: pageIndex,
                pageSize: pageSize,
            }
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        //onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: true,
        enableMultiSort: true,
        manualSorting: true,
        pageCount: responseData.pagination?.totalRecords ?? 0,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: Math.min(...AppConstants.Pagination.pageSizeRange),
            }
        },
        meta: {
            sortChanged: () => {
                if (columnConfig === null) return;
                setIsSortingChanged(true);
                console.log({
                    component: "admintable.customsorting change"
                })
            },
            saveColumnConfig: async (saveForAll: boolean) => {
                console.log({
                    component: "admintable.saveColumnConfig",
                    saveForAll,
                })
                saveColumnConfig && await saveColumnConfig(saveForAll);
            }
        } as TableMeta
    })

    React.useEffect(() => {
        const sortColumns = table.getState().sorting.map((state, index) => {
            return {
                column: state.id,
                descending: state.desc,
                index: index,
            } as SortColumn
        });

        if (columnConfig === null) return;
        (async () => {
            try {
                const responseData = await getAdminUsers(pageIndex, pageSize, sortColumns);
                setResponseData(responseData)
            } catch (err) {
                console.log('Error occured when fetching data');
            }
        })();
    }, [pageIndex, pageSize])

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

        if (columnConfig === null) return;
        setIsSortingChanged(false);

        (async () => {
            try {
                const responseData = await getAdminUsers(pageIndex, pageSize, sortColumns);
                setResponseData(responseData)
            } catch (err) {
                console.log('Error occured when fetching data');
            }
        })();

    }, [isSortingChanged])

    React.useEffect(() => {
        if (columnConfig !== null) return;
        console.log({
            component: "adminusertable.useffect.settingcolumnconfig",

        });
        (async () => {
            try {
                const responseData = await getColumnConfig();

                setColumnSequence(table, responseData.data)
                table.setColumnVisibility(getColumnVisibilityState(responseData.data))
                table.setSorting(getColumnSortingState(responseData.data))
                setIsSortingChanged(true);
                setColumnConfig(responseData.data || { hidden: [], sort: [], sequence: [] })
            } catch (err) {
                console.log({ err, message: 'Error occured when fetching data from column config' });
            }
        })();

    }, [columnConfig === null])


    return (
        <DataTable table={table} />
    );
}
