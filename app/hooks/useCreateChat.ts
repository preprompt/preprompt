import { useAccount } from "jazz-react"
import { Chat, ListOfChatMessages } from "~/jazz-schema"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Account, Group } from "jazz-tools"

export function useCreateChat() {
  const navigate = useNavigate()
  const { me } = useAccount({ root: { chats: [{}] } })
  const [loading, setLoading] = useState(false)

  async function createChat() {
    if (!me) return
    setLoading(true)
    try {
      const group = Group.create({ owner: me })
      // Use a generic worker ID - replace with your actual worker ID
      const worker = await Account.load("jazz-worker", me, {})
      if (!worker) {
        console.error("Could not load worker account")
        setLoading(false)
        return
      }

      group.addMember(worker, "writer")
      const chat = await Chat.create(
        {
          messages: ListOfChatMessages.create([], { owner: group }),
          name: `Chat ${new Date().toLocaleString()}`,
        },
        { owner: group },
      )

      me.root.chats.push(chat)
      navigate({ to: `/app/${chat.id}` })
    } catch (error) {
      console.error("Error creating chat:", error)
    }
    setLoading(false)
  }

  return { createChat, loading }
}
