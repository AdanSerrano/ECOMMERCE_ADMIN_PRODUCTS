'use client';

import { ColorSchema, ColorsFormValues, SizesFormValues, SizesSchema } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Color } from "@prisma/client";
import { ColorPicker } from "@/components/ui/color-picker";
import { Heading } from "@/components/ui/heading";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface ColorFormProps {
    initialData: Color | null;
}

export const ColorForm = ({ initialData }: ColorFormProps) => {
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("")

    const title = initialData ? 'Edit Color' : 'Create Color';
    const description = initialData ? 'Color updated' : 'Add a new Color';
    const toastMessage = initialData ? 'Edit a Color' : 'Color Created.';
    const action = initialData ? 'Save Change' : 'Create';

    const form = useForm<ColorsFormValues>({
        resolver: zodResolver(ColorSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    });

    const onSubmit = async (values: ColorsFormValues) => {
        console.log(values)
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorsId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/colors`, values);
            }
            router.push(`/${params.storeId}/colors`)
            router.refresh();
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {

            setLoading(true);
            await axios.delete(`/api/${params.storeId}/colors/${params.colorsId}`);
            router.push(`/${params.storeId}/colors`);
            router.refresh();
            toast.success("Color deleted successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                title='Delete Color'
                description='Are you sure you want to delete this Color?'
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        variant={'destructive'}
                        size={'icon'}
                        disabled={loading}
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
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
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Color Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Select color"
                                            />
                                            <ColorPicker
                                                onChange={field.onChange}
                                                value={field.value}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className='ml-auto' type="submit" disabled={loading}>
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
