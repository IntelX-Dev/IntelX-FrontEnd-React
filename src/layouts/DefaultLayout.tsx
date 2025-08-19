
import React from 'react'
import { Header } from '@/components/ui/header'
import { CollapsibleSidebar } from '@/components/ui/collapsible-sidebar'

interface DefaultLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export function DefaultLayout({ children, showSidebar = true }: DefaultLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {showSidebar && <CollapsibleSidebar />}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
