/*
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { FormInput, FormInputHandle } from "@/components/customui/forminput"
import React, { useRef } from 'react'
import { App as AppConstants } from "@/lib/types/constants"
 */

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { FormInput, FormInputHandle } from "@/components/customui/forminput"
import React, { useRef } from 'react'
import { App as AppConstants } from "@/lib/types/constants"
interface DataTablePaginationProps<TData> {
    table: Table<TData>
}



export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {

    const refPageNumber = useRef<FormInputHandle>();

    function onPageNumberChange(value: string) {
        if (!value.length) return;
        const pageCount = table.getPageCount()
        const pageIndex = table.getState().pagination.pageIndex;
        const newPageNumber = parseInt(value);
        if (isNaN(newPageNumber)
            || !newPageNumber
            || newPageNumber < 1
            || newPageNumber > pageCount) {
            setInputPageNumber(pageIndex);
            return;
        }
        table.setPageIndex(newPageNumber - 1)
    }

    function onPageNumberReset() {
        table.setPageIndex(0);
    }

    function onPageNumberBlur() {
        const value = refPageNumber!.current!.getValue();
        const pageCount = table.getPageCount();
        const pageIndex = table.getState().pagination.pageIndex;
        const newPageNumber = parseInt(value);
        if (!value.length
            || isNaN(newPageNumber)
            || !newPageNumber
            || newPageNumber < 1
            || newPageNumber > pageCount) {
            setInputPageNumber(pageIndex);
            return;
        }
    }

    function setInputPageNumber(newPageIndex: number) {
        refPageNumber?.current?.setValue((newPageIndex + 1).toString())
    }

    React.useEffect(() => {
        if (refPageNumber?.current?.getValue() !== (table.getState().pagination.pageIndex + 1).toString()) {
            setInputPageNumber(table.getState().pagination.pageIndex)
        }
    }, [table.getState().pagination.pageIndex]);

    return (
        <div className="flex flex-wrap items-end justify-end px-0.5">
            <div className="items-end px-2">
                <span className="text-xs font-medium block ms-2">Rows</span>
                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}
                >
                    <SelectTrigger className="h-8 ms-0 px-1 hover:border-2">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {AppConstants.Pagination.pageSizeRange.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`} className="hover:border-2">
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-wrap items-end space-x-2">
                <Button
                    variant="outline"
                    className="flex h-8 items-center justify-between px-1 mt-1  hover:border-2"
                    onClick={() => { table.setPageIndex(0) }}
                    disabled={!table.getCanPreviousPage()}
                >
                    <DoubleArrowLeftIcon className="my-auto h-4 w-4" />
                    <span className="ps-1 mt-1">1</span>
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0 mt-1 hover:border-2"
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <div className="content flex">
                    <FormInput ref={refPageNumber} inputType={"number"} title="Page" minWidth={85} maxWidth={85} onTextChange={onPageNumberChange} onValueCleared={onPageNumberReset} initialValue="1" onBlur={onPageNumberBlur} />
                </div>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0 mt-1  hover:border-2"
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="flex h-8 items-center justify-between px-1 mt-1  hover:border-2"
                    onClick={() => {
                        table.setPageIndex(table.getPageCount() - 1);
                    }}
                    disabled={!table.getCanNextPage()}>
                    <span className="pe-1 mt-1">{table.getPageCount()}</span>
                    <DoubleArrowRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>

    )
}
