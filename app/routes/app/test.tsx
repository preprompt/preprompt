import { createFileRoute } from "@tanstack/react-router"
import { useAccount } from "jazz-react"

function RouteComponent() {
  const { me } = useAccount({ root: { chats: [{}] } })
  console.log(me, "me")
  return (
    <>
      <div>test</div>
    </>
  )
}

export const Route = createFileRoute("/app/test")({
  component: RouteComponent,
})
