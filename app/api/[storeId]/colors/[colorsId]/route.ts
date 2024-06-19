import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { colorsId: string } }
) {
    try {

        if (!params.colorsId) {
            return new NextResponse("Sizes id is required", { status: 400 })
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorsId,
            }
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, colorsId: string } }
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


        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorsId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, colorsId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.colorsId) {
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

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorsId,
            }
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}