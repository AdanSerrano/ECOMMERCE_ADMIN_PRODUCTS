'use client'

import { columns, OrdersColumns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

interface OrderClientProps {
    data: OrdersColumns[]
}

export const OrderClient = ({ data }: OrderClientProps) => {

    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    )
}

