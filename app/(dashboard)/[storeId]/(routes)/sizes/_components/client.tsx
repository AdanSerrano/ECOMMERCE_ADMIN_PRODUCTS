'use client'

import { SizesColumns, columns } from "./columns"
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

interface SizesClientProps {
    data: SizesColumns[]
}

export const SizesClient = ({ data }: SizesClientProps) => {
    const router = useRouter()
    const params = useParams()


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage sizes for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/news`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for sizes" />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizesId" />
        </>
    )
}

