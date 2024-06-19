import React from 'react'
import { SizeForm } from './_components/SizesForm'
import prismadb from '@/lib/db'

export default async function BillboardIdPage({ params }: { params: { sizesId: string } }) {

    const sizes = await prismadb.size.findUnique({
        where: {
            id: params.sizesId
        }
    })

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SizeForm initialData={sizes} />
            </div>
        </div>
    )
}
