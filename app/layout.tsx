import './globals.css'

import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Inter as FontSans } from "next/font/google"
import type { Metadata } from 'next'
import { ModalProvider } from '@/providers/modal-provider'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )} suppressHydrationWarning={true}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <ModalProvider />
              {children}
              <Toaster />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
