'use client'

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { StoreModal } from "@/components/modals/store-modal"
import { useEffect } from "react"
import { useStoreModal } from "@/hooks/use-store-modal"

export default function SetupPage() {
    const onOpen = useStoreModal((state) => state.onOpen)
    const isOpen = useStoreModal((state) => state.isOpen)

    useEffect(() => {
        if (!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])

    return null
}
