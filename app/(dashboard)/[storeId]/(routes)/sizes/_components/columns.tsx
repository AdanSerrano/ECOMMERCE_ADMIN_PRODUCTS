import { CellAction } from "./cell-action"
import { ColumnDef } from "@tanstack/react-table"

export type SizesColumns = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<SizesColumns>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "value",
        header: "Value"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
