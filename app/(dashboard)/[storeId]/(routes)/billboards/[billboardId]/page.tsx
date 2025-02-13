import { BillboardForm } from './_components/BillboardForm'
import React from 'react'
import prismadb from '@/lib/db'

export default async function BillboardIdPage({ params }: { params: { billboardId: string } }) {

    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    )
}
