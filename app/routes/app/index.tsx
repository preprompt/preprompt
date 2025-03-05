// import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"
// import { useAccount } from "jazz-react"
// import { Button } from "~/components/Button"
// import { useCreateChat } from "~/hooks/useCreateChat"

// // TODO: breaking, first fix jazz CRUD

// function ChatLayout() {
//   const navigate = useNavigate()
//   const { me } = useAccount({ root: { chats: [{}] } })
//   const { createChat, loading } = useCreateChat()

//   // const recentChats =
//   //   me?.root?.chats
//   //     ?.map((chat: any) => ({
//   //       id: chat?.id,
//   //       title: chat?.name,
//   //       created: chat?._edits?.name?.madeAt || new Date(),
//   //       date:
//   //         chat?._edits?.name?.madeAt?.toLocaleDateString() ||
//   //         new Date().toLocaleDateString(),
//   //     }))
//   //     .sort((a: any, b: any) => b.created.getTime() - a.created.getTime()) || []

//   {
//     /* <div className="w-64 border-r">
//         <div className="p-4">
//           <Button
//             onClick={createChat}
//             variant="outline"
//             disabled={loading}
//             className="w-full justify-start"
//           >
//             {loading ? "Creating Chat..." : "New Chat"}
//           </Button>
//         </div>
//         <div className="px-4 py-2">
//           {recentChats.map((chat: any) => (
//             <Button
//               key={chat.id}
//               onClick={() => navigate({ to: `/app/${chat.id}` })}
//               variant="ghost"
//               className="w-full justify-start p-2 h-12 mb-1"
//             >
//               <div className="flex flex-col items-start">
//                 <span className="text-sm font-medium">{chat.title}</span>
//                 <span className="text-xs text-muted-foreground">
//                   {chat.date}
//                 </span>
//               </div>
//             </Button>
//           ))}
//         </div>
//       </div> */
//   }

//   return (
//     <div className="flex h-screen bg-background w-full">
//       <div className="flex-1 flex flex-col">
//         <Outlet />
//       </div>
//     </div>
//   )
// }

// export const Route = createFileRoute("/app/")({
//   component: ChatLayout,
// })

import { createFileRoute } from "@tanstack/react-router"
import { useAccount } from "jazz-react"
import { ActionButtons } from "~/components/ActionButtons"

const AIAssistantWindow = () => {
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
    <div className="flex flex-col font-grotesk items-center justify-center min-h-screen w-full max-w-2xl mx-auto p-5">
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
  component: AIAssistantWindow,
})

export default AIAssistantWindow
