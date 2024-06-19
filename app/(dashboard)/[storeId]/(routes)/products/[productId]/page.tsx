import { ProductsForm } from './_components/ProductsForm'
import React from 'react'
import prismadb from '@/lib/db'

export default async function ProductIdPage({ params }: { params: { productId: string, storeId: string } }) {

    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductsForm
                    initialData={product}
                    categories={categories}
                    sizes={sizes}
                    colors={colors}
                />
            </div>
        </div>
    )
}
