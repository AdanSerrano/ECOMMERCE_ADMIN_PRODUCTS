"use client";

import { ImagePlusIcon, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (url: string) => void;
    onRemove: (url: string) => void;
    value: string[];
}

export const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value
}: ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) return null;

    return (
        <div>
            <div className='flex items-center gap-4'>
                {value.map((url) => (
                    <div key={url} className='my-4 relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='z-10 absolute top-2 right-2'>
                            <Button type='button' onClick={() => onRemove(url)} variant={'destructive'} size={'icon'}>
                                <Trash className='h-4 w-4' />
                            </Button>
                        </div>
                        <Image
                            width={500}
                            height={500}
                            className="w-full h-auto"
                            alt='image'
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset='o8ypegfr'>
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };
                    return (
                        <Button
                            type='button'
                            disabled={disabled}
                            variant={'secondary'}
                            onClick={onClick}
                        >
                            <ImagePlusIcon className='h-4 w-4 mr-2' />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};
