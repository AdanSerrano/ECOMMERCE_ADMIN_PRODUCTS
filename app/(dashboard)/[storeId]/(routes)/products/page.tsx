import { ProductsClient } from "./_components/client";
import { ProductsColumns } from "./_components/columns";
import { format } from 'date-fns'
import { formatter } from "@/lib/utils";
import prismadb from "@/lib/db";

export default async function ProductsPage({ params }: { params: { storeId: string } }) {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProducts: ProductsColumns[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsClient data={formattedProducts} />
            </div>
        </div>
    )
}
