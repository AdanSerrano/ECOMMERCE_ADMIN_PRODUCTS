import { ColorForm } from './_components/ColorsForm'
import React from 'react'
import prismadb from '@/lib/db'

export default async function BillboardIdPage({ params }: { params: { colorsId: string } }) {

    const colors = await prismadb.color.findUnique({
        where: {
            id: params.colorsId
        }
    })

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ColorForm initialData={colors} />
            </div>
        </div>
    )
}
