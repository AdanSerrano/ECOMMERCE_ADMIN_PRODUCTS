'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useStoreModal } from '@/hooks/use-store-modal'
import { Store } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Store as StoreIcon, ChevronsUpDownIcon, Check, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}


export const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
    const store = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map((item) => (
        {
            label: item.name,
            value: item.id
        }
    ))

    const currentStore = formattedItems.find((item) => item.value === params.storeId)

    const [open, setOpen] = useState(false)

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }


    // console.log(items)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    role='combobox'
                    size={'sm'}
                    aria-expanded={open}
                    aria-label='Select Store'
                    className={cn('w-[200px] justify-between', className)}
                >
                    <StoreIcon className='mr-2 h-4 w-4' />
                    {currentStore?.label}
                    <ChevronsUpDownIcon className='h-4 w-4 ml-auto shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput placeholder="Search store..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Store found.</CommandEmpty>
                        <CommandGroup heading='Stores'>
                            {formattedItems.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    onSelect={() => onStoreSelect(item)}
                                    className='text-sm'
                                >
                                    <StoreIcon className='mr-2 h-4 w-4' />
                                    {item.label}
                                    <Check className={cn('ml-auto h-4 w-4', currentStore?.value === item.value ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandItem
                            onSelect={() => {
                                setOpen(false)
                                store.onOpen()
                            }}
                        >
                            <PlusCircle className='mr-2 h-5 w-5' />
                            Create Store
                        </CommandItem>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover >
    )
}
