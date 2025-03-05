import { createFileRoute } from "@tanstack/react-router"
import { useAccount } from "jazz-react"

function RouteComponent() {
  const { me } = useAccount({ root: { chats: [{}] } })
  if (!me) return <></>
  console.log(me, "me")
  // const chats =
  //   me?.root?.chats
  //     ?.map((chat) => ({
  //       id: chat?.id,
  //       name: chat?.name,
  //       created: chat?._edits?.name?.madeAt || new Date(),
  //       messageCount: chat?.messages?.length || 0,
  //     }))
  //     .sort((a, b) => b.created.getTime() - a.created.getTime()) || []

  return (
    <>
      <div>test</div>
    </>
  )
}

export const Route = createFileRoute("/app/test")({
  component: RouteComponent,
})
