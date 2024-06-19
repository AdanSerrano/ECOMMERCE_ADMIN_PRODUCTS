import { CellAction } from "./cell-action"
import { ColumnDef } from "@tanstack/react-table"

export type BillboardColumns = {
    id: string
    label: string
    createdAt: string
}

export const columns: ColumnDef<BillboardColumns>[] = [
    {
        accessorKey: "label",
        header: "Label"
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
