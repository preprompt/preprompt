import * as React from "react"
import { cn } from "~/lib/utils"

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex">{children}</div>

export const Sidebar: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => (
  <aside
    className={cn(
      "bg-sidebar text-sidebar-foreground w-64 border-r",
      className,
    )}
  >
    {children}
  </aside>
)

export const SidebarHeader: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => (
  <div className={cn("p-4 border-b", className)}>{children}</div>
)

export const SidebarContent: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => (
  <div className={cn("px-4 py-2", className)}>{children}</div>
)

export const SidebarMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <nav>{children}</nav>

export const SidebarMenuItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div>{children}</div>

export const SidebarMenuButton: React.FC<{
  asChild?: boolean
  children: React.ReactNode
}> = ({ asChild, children }) =>
  asChild ? <>{children}</> : <div>{children}</div>
