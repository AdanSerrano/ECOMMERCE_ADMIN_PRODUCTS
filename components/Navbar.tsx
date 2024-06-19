import { MainNav } from '@/components/MainNav'
import React from 'react'
import { StoreSwitcher } from '@/components/StoreSwitcher'
import { ThemeToggle } from './theme-toggle'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import prismadb from '@/lib/db'
import { redirect } from 'next/navigation'

export const Navbar = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className='border-b'>
            <div className='h-16 flex items-center px-4'>
                <StoreSwitcher items={store} />
                <MainNav className='mx-6' />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeToggle />
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </div>
    )
}
