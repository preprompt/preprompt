import { useAccount, useIsAuthenticated } from "jazz-react"
import { useState } from "react"
import { Button } from "./Button"
import { AuthModal } from "./AuthModal"

export function AuthButton() {
  const isAuthenticated = useIsAuthenticated()
  const { logOut } = useAccount()
  const [open, setOpen] = useState(false)
  if (isAuthenticated) {
    return (
      <Button variant="outline" onClick={logOut}>
        Sign out
      </Button>
    )
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>Sign up</Button>
      <AuthModal open={open} onOpenChange={setOpen} />
    </>
  )
}
