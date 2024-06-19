import { CellAction } from "./cell-action"
import { ColumnDef } from "@tanstack/react-table"

export type CategoriesColumns = {
    id: string
    name: string
    billboardLabel: string
    createdAt: string
}

export const columns: ColumnDef<CategoriesColumns>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "billboard",
        header: "Billboard",
        cell: ({ row }) => row.original.billboardLabel
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
