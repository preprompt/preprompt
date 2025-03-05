import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"
import { useAccount } from "jazz-react"
import { Button } from "~/components/Button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/Sidebar"
import { useCreateChat } from "~/hooks/useCreateChat"

// TODO: breaking, first fix jazz CRUD

function ChatLayout() {
  const navigate = useNavigate()
  const { me } = useAccount({ root: { chats: [{}] } })
  const { createChat, loading } = useCreateChat()

  const recentChats =
    me?.root?.chats
      ?.map((chat) => ({
        id: chat?.id,
        title: chat?.name,
        created: chat?._edits?.name?.madeAt || new Date(),
        date:
          chat?._edits?.name?.madeAt?.toLocaleDateString() ||
          new Date().toLocaleDateString(),
      }))
      .sort((a, b) => b.created.getTime() - a.created.getTime()) || []

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">
        <Sidebar className="w-64 border-r">
          <SidebarHeader className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    onClick={createChat}
                    variant="outline"
                    disabled={loading}
                    className="w-full justify-start"
                  >
                    {loading ? "Creating Chat..." : "New Chat"}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent className="px-4 py-2">
            <SidebarMenu>
              {recentChats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild>
                    <Button
                      onClick={() => navigate({ to: `/app/${chat.id}` })}
                      variant="ghost"
                      className="w-full justify-start p-2 h-12"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">
                          {chat.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {chat.date}
                        </span>
                      </div>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}

export const Route = createFileRoute("/app/")({
  component: ChatLayout,
})
