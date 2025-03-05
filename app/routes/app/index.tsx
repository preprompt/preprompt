import { createFileRoute } from "@tanstack/react-router"
import { useAccount } from "jazz-react"
import { ActionButtons } from "~/components/ActionButtons"

function RouteComponent() {
  const { me } = useAccount({ root: { chats: [{}] } })
  const userName = me || "User"

  const getGreetingTime = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return "morning"
    } else if (hour < 18) {
      return "afternoon"
    } else {
      return "evening"
    }
  }

  const greetingTime = getGreetingTime()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-2xl mx-auto p-5">
      <p className="text-2xl text-center mb-4">
        Good {greetingTime},<br />
        {userName?.toString() || "User"}. How can I help you today?
      </p>
      <div className="w-full flex items-center bg-neutral-800 p-3 rounded-3xl">
        <input
          type="text"
          placeholder="How can I help you?"
          className="flex-1 border-none bg-transparent p-1.5 focus:outline-none text-neutral-200"
        />
      </div>
      <ActionButtons />
    </div>
  )
}

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
})
