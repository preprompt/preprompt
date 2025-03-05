import { usePasskeyAuth } from "jazz-react"
import { useState } from "react"

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
}
