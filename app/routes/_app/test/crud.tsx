import { createFileRoute } from "@tanstack/react-router"
import { useAccount, useIsAuthenticated } from "jazz-react"

function RouteComponent() {
  const { me } = useAccount({ profile: {}, root: { websites: {} } })
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated) {
    // TODO: redirect to /test
    return <div>Not authenticated</div>
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen w-full max-w-2xl mx-auto p-5">
      <main className="container flex flex-col gap-8"></main>
    </div>
  )
}

export const Route = createFileRoute("/_app/test/crud")({
  component: RouteComponent,
})
