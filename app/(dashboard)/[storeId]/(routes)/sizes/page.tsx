import { useEffect, useState } from "react";

import { SizesClient } from "./_components/client";
import { SizesColumns } from "./_components/columns";
import { format } from 'date-fns'
import prismadb from "@/lib/db";

export default async function SizesPage({ params }: { params: { storeId: string } }) {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedSizes: SizesColumns[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={formattedSizes} />
            </div>
        </div>
    )
}
