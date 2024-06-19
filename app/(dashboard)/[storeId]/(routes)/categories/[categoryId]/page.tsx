import { CategoryForm } from './_components/CategoryForm'
import React from 'react'
import prismadb from '@/lib/db'

export default async function CategoryIdPage({ params }: { params: { categoryId: string, storeId: string } }) {

    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    })

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryForm billboards={billboards} initialData={category} />
            </div>
        </div>
    )
}
