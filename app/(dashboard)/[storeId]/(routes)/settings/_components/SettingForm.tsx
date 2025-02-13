'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SettingsFormValues, formSchema } from "@/schema"
import { useParams, useRouter } from "next/navigation"

import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useOrigin } from "@/hooks/use-origin"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

interface SettingsFormProps {
    initialData: Store
}


export const SettingsForm = ({ initialData }: SettingsFormProps) => {
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (values: SettingsFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, values)
            router.refresh()
            toast.success("Store updated successfully")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.push('/')
            router.refresh()
            toast.success("Store deleted successfully")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                title='Delete Store'
                description='Are you sure you want to delete this store?'
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title='Settings'
                    description='Manage store preference'
                />
                <Button
                    variant={'destructive'}
                    size={'icon'}
                    disabled={loading}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Storare name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className='ml-auto' type="submit" disabled={loading}>
                        Submit
                    </Button>
                </form>
            </Form>
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/stores/${params.storeId}`}
                variant="admin"
            />
        </>
    )
}
