import { useState, useEffect, useRef, useCallback } from "react";
import { Column, SortingState, Row as RowPrimitive, Table as TablePrimitive, VisibilityState } from "@tanstack/react-table"
/*
import { TableConfig, SortColumn } from "@/lib/types/types";
import { App as AppConstants } from "@/lib/types/constants"
 */

import { TableConfig, SortColumn } from "@/lib/types/types";
import { App as AppConstants } from "@/lib/types/constants"

const useStickyHeader = (defaultSticky = false) => {
    const [isSticky, setIsSticky] = useState(defaultSticky);
    const tableRef = useRef<HTMLTableElement>(null);

    const toggleStickiness = useCallback(
        ({ top, bottom }: { top: number, bottom: number }) => {
            if (
                top <= 0 &&
                // When scrolling from bottom to top when and
                // the last row is visible enough, sticky header will be triggered.
                // This number (68) could be adjusted or skipped.
                bottom > 2 //* 68
            ) {
                !isSticky && setIsSticky(true);
            } else {
                isSticky && setIsSticky(false);
            }
        },
        [isSticky]
    );

    useEffect(() => {
        const handleScroll = () => {
            if (tableRef?.current)
                toggleStickiness(tableRef.current.getBoundingClientRect());
        };
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [toggleStickiness]);

    return { tableRef, isSticky };
};

export default useStickyHeader;

export interface ColumnMeta {
    title: string
}

export interface TableMeta<T> {
    tableType: string,
    id: string
    sortChanged?: () => void
    saveTableConfig?: (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => void
    deleteSavedTableConfig?: (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => void
    loadSavedTableConfig?: (table: TablePrimitive<T>, forAll: boolean, forDefault: boolean) => void
    showSelectedTable?: () => void
    showMainTable?: () => void
    onSelectedRowRemoved?: (rows: RowPrimitive<T>[]) => void
    onSelectedRowAdded?: (rows: RowPrimitive<T>[]) => void
    onRowDeleted?: (row: RowPrimitive<T>) => void
    onAllRowsDeleted?: (table: TablePrimitive<T>) => void
    tableConfig?: TableConfig | null,
    isTableForSelectedData: boolean,
    enableRowSelection?: boolean,
    enableMultiRowSelection?: boolean,
    showConfigOptionsForAll?: boolean,
    showConfigOptionsForDefault?: boolean,
}

export function getColumnTitle<T>(column: Column<T, unknown>) {
    return (column.columnDef.meta as ColumnMeta)?.title ?? column.id;
}

export function getColumnMeta<T>(column: Column<T, unknown>) {
    return column.columnDef.meta as ColumnMeta;
}

export function getTableMeta<T>(table: TablePrimitive<T>) {
    return table.options.meta as TableMeta<T>;
}

export function getColumnVisibilityState(tableConfig: TableConfig | null) {
    let visibilityState: VisibilityState = {}
    tableConfig?.hidden?.forEach((col) => {
        visibilityState[col.column] = false;
    })
    return visibilityState;
}

export function getColumnSortingState(columnConfig: TableConfig | null) {
    let sortingState: SortingState = [];
    columnConfig?.sort?.sort((a, b) => {
        const valueA = a.index;
        const valueB = b.index;
        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    })
    columnConfig?.sort?.forEach((col) => {
        sortingState.push({
            id: col.column,
            desc: col.descending,
        })
    })
    return sortingState;
}

export function setColumnSequence<T>(table: TablePrimitive<T>, tableConfig: TableConfig | null) {

    const allColumns = table.getAllColumns();
    const columnSequence = allColumns.map((col, index) => {
        return {
            col, index
        }
    })

    tableConfig?.sequence?.sort((a, b) => {
        const valueA = a.index;
        const valueB = b.index;
        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    });

    tableConfig?.sequence?.forEach((configSequence) => {
        let currentSequence = columnSequence?.find((a) => a.col.id == configSequence.column);
        if (!currentSequence) return;

        if (currentSequence.index === configSequence.index) return;

        let replaceSequence = columnSequence?.find((a) => a.index == configSequence.index);
        if (!replaceSequence) return;

        let currentIndex = columnSequence.findIndex((a) => a.col.id == currentSequence!.col!.id);
        columnSequence.splice(currentIndex, 1);

        let replaceIndex = columnSequence.findIndex((a) => a.col.id == replaceSequence!.col!.id);
        columnSequence.splice(replaceIndex, 0, currentSequence);

        columnSequence.forEach((col, index) => col.index = index);
    });


    table.getAllColumns().sort((a, b) => {
        const valueA = columnSequence.find((col) => col.col.id == a.id)!.index;
        const valueB = columnSequence.find((col) => col.col.id == b.id)!.index;

        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    })

    table.resetColumnOrder(true);

}

export function initializeTableState<T>(table: TablePrimitive<T>, tableConfig: TableConfig | null) {
    const tableMeta = getTableMeta(table)
    let recordsPerPage = Math.min(...AppConstants.Pagination.pageSizeRange);
    setColumnSequence(table, tableConfig)

    table.setColumnVisibility(getColumnVisibilityState(tableConfig))
    table.setSorting(getColumnSortingState(tableConfig))
    if (tableConfig?.pagination?.recordsPerPage) recordsPerPage = tableConfig.pagination.recordsPerPage
    table.setPageSize(recordsPerPage)

    tableMeta?.sortChanged && tableMeta?.sortChanged();
    return {
        sort: tableConfig?.sort || [],
        hidden: tableConfig?.hidden || [],
        sequence: table.getAllColumns().map((column, index) => ({
            column: column.id,
            index: index,
        })),
        pagination: {
            recordsPerPage
        }
    } as TableConfig
}

export function getTableConfig<T>(table: TablePrimitive<T>) {
    const tableConfig: TableConfig = {
        sequence: table.getAllColumns().map((column, index) => ({
            column: column.id,
            index: index,
        })),
        sort: getTableSortConfig(table),
        hidden: table.getAllColumns().filter((column) => !column.getIsVisible()).map((column) => {
            return {
                column: column.id
            }
        }),
        pagination: {
            recordsPerPage: table.getState().pagination.pageSize,
        }
    }
    return tableConfig;
}

export function getTableSortConfig<T>(table: TablePrimitive<T>) {
    return table.getState().sorting.map((column, index) => {
        return {
            column: column.id,
            descending: column.desc,
            index: index,
        } as SortColumn
    })
}

export const DataTableConstants = {
    actions: "actions",
    select: "select",
    delete: "delete",
    asc: "asc",
    desc: "desc"
}

export type fnSaveTableConfig = (tableId: string, tableConfig: TableConfig, saveForAll: boolean) => void
export type fnDeleteSavedTableConfig = (tableId: string, deleteForAll: boolean) => void
export type fnGetTableConfig = (tableId: string, forAll: boolean, forceGetForAll: boolean) => TableConfig
export type fnGetData<T> = (page: number, pageSize: number, sortColumn: SortColumn[]) => T[]

export function getPageCount(pageSize: number, totalRecords: number) {
    if (pageSize <= 0) pageSize = 1;
    if (totalRecords <= 0) return 0;
    let totalPages = totalRecords / pageSize
    let pageCount = Math.floor(totalPages)
    if (totalPages > pageCount) return pageCount + 1;
    return pageCount;
}
