'use client'

import { ColorsColumns, columns } from "./columns"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useParams, useRouter } from "next/navigation"

import { ApiList } from "@/components/ui/api-list"
import { Billboard } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface ColorClientProps {
    data: ColorsColumns[]
}

export const ColorClient = ({ data }: ColorClientProps) => {
    const router = useRouter()
    const params = useParams()


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage Colors for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/news`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for colors" />
            <Separator />
            <ApiList entityName="colors" entityIdName="colorsId" />
        </>
    )
}

