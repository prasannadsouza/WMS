'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "./data-column-header";
import { DataTable } from "./data-table";

export type User = {
    id: string,
    name: string,
    email: string,
};

const users: User[] = [
    {
        id: "pra",
        name: "Prasanna",
        email: "pra@email.com",
    },
    {
        id: "pra2",
        name: "Prasanna",
        email: "pra2@email.com",
    },
    {
        id: "pra3",
        name: "Prasanna",
        email: "pra3@email.com",
    },
    {
        id: "pra4",
        name: "Prasanna",
        email: "pra4@email.com",
    },
];

const columns = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "email",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }: { row: any }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


export function AdminUserTable() {
    return (
        <DataTable columns={columns} data={users} />
    );
}
