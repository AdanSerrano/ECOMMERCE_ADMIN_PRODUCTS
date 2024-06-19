import { useEffect, useState } from "react";

import { OrderClient } from "./_components/client";
import { OrdersColumns } from "./_components/columns";
import { format } from 'date-fns'
import { formatter } from "@/lib/utils";
import prismadb from "@/lib/db";

export default async function OrderPage({ params }: { params: { storeId: string } }) {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItem: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedOrders: OrdersColumns[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products: item.orderItem.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItem.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}
