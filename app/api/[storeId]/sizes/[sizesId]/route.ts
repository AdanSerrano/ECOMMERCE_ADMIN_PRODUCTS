import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { sizesId: string } }
) {
    try {

        if (!params.sizesId) {
            return new NextResponse("Sizes id is required", { status: 400 })
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizesId,
            }
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizesId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { name, value } = body
        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }
        if (!value) {
            return new NextResponse('Value is required', { status: 400 })
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


        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizesId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, sizesId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.sizesId) {
            return new NextResponse("Sizes id is required", { status: 400 })
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

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizesId,
            }
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}