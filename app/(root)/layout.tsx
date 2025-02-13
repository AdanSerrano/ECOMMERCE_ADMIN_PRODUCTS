import React from 'react'
import { auth } from '@clerk/nextjs/server'
import prismadb from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
    const { userId } = auth()
    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })

    if (store) {
        redirect(`/${store.id}`)
    }
    return (
        <>
            {children}
        </>
    )
}
