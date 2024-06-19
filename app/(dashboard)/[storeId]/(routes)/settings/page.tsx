import { SettingsForm } from "@/app/(dashboard)/[storeId]/(routes)/settings/_components/SettingForm"
import prismadb from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface SettingsPageProps {
    params: {
        storeId: string
    }
}



export default async function SettingsPage({ params }: SettingsPageProps) {
    const { userId } = auth()
    if (!userId) {
        redirect('/sign-in')
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    if (!store) {
        redirect('/')
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-4">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}
