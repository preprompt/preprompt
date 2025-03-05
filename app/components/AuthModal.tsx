import { usePasskeyAuth } from "jazz-react"
import { useState } from "react"
import { Button } from "./Button"

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [username, setUsername] = useState("")
  const [isSignUp, setIsSignUp] = useState(true)
  const auth = usePasskeyAuth({
    appName: "My super-cool web app",
  })
  const handleViewChange = () => {
    setIsSignUp(!isSignUp)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      await auth.signUp(username)
    } else {
      await auth.logIn()
    }
    onOpenChange(false)
  }

  // TODO: make into modal proper
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between">
          <Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
          <Button type="button" variant="ghost" onClick={handleViewChange}>
            {isSignUp ? "Already have an account?" : "Need an account?"}
          </Button>
        </div>
      </form>
    </>
  )
}
