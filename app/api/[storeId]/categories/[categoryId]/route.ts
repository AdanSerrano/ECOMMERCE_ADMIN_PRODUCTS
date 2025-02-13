import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 })
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                billboard: true
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { name, billboardId } = body
        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }
        if (!billboardId) {
            return new NextResponse('Image is required', { status: 400 })
        }


        if (!params.storeId) {
            return new NextResponse('Store ID is required', { status: 400 })
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


        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 })
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

        if (!params.storeId) {
            return new NextResponse('Store ID is required', { status: 400 })
        }

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}