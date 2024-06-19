import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/db";

export async function GET(request: NextRequest) {
    const data = await prismadb.store.findMany();
    return NextResponse.json({ data });
}



export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json()

        const { name } = body;
        console.log(userId)
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })


        return NextResponse.json(store)

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}