import { createFileRoute, useParams } from "@tanstack/react-router"
import { useCoState } from "jazz-react"
import { CoPlainText } from "jazz-tools"
import { useEffect, useRef, useState } from "react"
import { Button } from "~/components/Button"
import { Input } from "~/components/Input"
import { Chat, ChatMessage } from "~/jazz-schema"

// TODO: breaking, first fix jazz CRUD

function ChatPage() {
  const { id } = useParams({ from: "/app/$id" })
  const chat = useCoState(Chat, id, {
    messages: [{ text: [] }],
  })
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chat?.messages])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!chat || !message.trim()) return

    try {
      const chatMessage = ChatMessage.create(
        {
          content: message,
          text: CoPlainText.create(message, { owner: chat._owner }),
          role: "user",
        },
        { owner: chat._owner },
      )

      chat.messages?.push(chatMessage)
      setMessage("")

      // Simulate an AI response
      setTimeout(() => {
        if (!chat) return
        const aiMessage = ChatMessage.create(
          {
            content:
              "This is a simulated response. Implement actual AI integration as needed.",
            text: CoPlainText.create(
              "This is a simulated response. Implement actual AI integration as needed.",
              { owner: chat._owner },
            ),
            role: "assistant",
          },
          { owner: chat._owner },
        )
        chat.messages?.push(aiMessage)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  if (!chat) return <div>Loading chat...</div>

  const orderedMessages = chat?.messages
    ?.slice()
    .sort(
      (a, b) =>
        (a?._edits?.role?.madeAt?.getTime() || 0) -
        (b?._edits?.role?.madeAt?.getTime() || 0),
    )

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {chat?.name || "Chat"}
        </h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {orderedMessages?.map((msg) => (
          <div
            key={msg?.id}
            className={`flex ${msg?.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                msg?.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg?.text?.toString() || msg?.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="bg-white p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}

export const Route = createFileRoute("/app/$id")({
  component: ChatPage,
})
