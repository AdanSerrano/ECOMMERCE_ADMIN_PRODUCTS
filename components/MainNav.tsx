'use client'

import { useParams, usePathname } from "next/navigation"

import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

export const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname()
    const params = useParams()
    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categories',
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Sizes',
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Color',
            active: pathname === `/${params.storeId}/colors`
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            active: pathname === `/${params.storeId}/products`
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`
        },

    ]
    return (
        <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
            {routes.map((route, index) => (
                <Link key={index} href={route.href} className={cn("text-sm text-medium transition-colors hover:text-primary ", route.active ? 'text-black black:text-white' : 'text-muted-foreground')}>
                    {route.label}
                </Link>
            ))}

        </nav>
    )
}
