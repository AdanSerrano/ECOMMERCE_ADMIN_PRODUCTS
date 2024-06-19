import { useEffect, useState } from "react";

import { CategoriesClient } from "./_components/client";
import { CategoriesColumns } from "./_components/columns";
import { format } from 'date-fns'
import prismadb from "@/lib/db";

export default async function CategoriesPage({ params }: { params: { storeId: string } }) {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoriesColumns[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoriesClient data={formattedCategories} />
            </div>
        </div>
    )
}
