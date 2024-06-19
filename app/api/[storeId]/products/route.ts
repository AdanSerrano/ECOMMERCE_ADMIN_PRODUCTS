import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/db";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json()

        const {
            name,
            images,
            price,
            categoryId,
            colorId,
            sizeId,
            isFeatured,
            isArchived,
        } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }
        if (!images || !images.length) {
            return new NextResponse('Image is required', { status: 400 })
        }

        if (!price) {
            return new NextResponse('Price is required', { status: 400 })
        }
        if (!categoryId) {
            return new NextResponse('Category Id is required', { status: 400 })
        }

        if (!sizeId) {
            return new NextResponse('Size Id is required', { status: 400 })
        }
        if (!colorId) {
            return new NextResponse('Color Id is required', { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse('Store is required', { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: string) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        if (!params.storeId) {
            return new NextResponse('Store is required', { status: 400 })
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured: isFeatured === 'true' ? true : undefined,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products)

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}