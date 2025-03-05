import { createFileRoute } from "@tanstack/react-router"
import { useAccount, useIsAuthenticated } from "jazz-react"
import { AuthButton } from "~/components/AuthButton"

function RouteComponent() {
  const { me } = useAccount({ profile: {}, root: {} })
  const isAuthenticated = useIsAuthenticated()
  console.log(isAuthenticated, "isAuthenticated")

  return (
    <>
      <header>
        <nav className="container flex justify-between items-center py-3">
          {isAuthenticated ? (
            <span></span>
          ) : (
            <span>Auth to share data with another device</span>
          )}
          <AuthButton />
        </nav>
      </header>
      <main className="container mt-16 flex flex-col gap-8">
        <div className="text-center">
          <pre className="text-left inline-block bg-gray-100 p-4 rounded-lg overflow-auto max-w-full">
            {JSON.stringify(me?.root)}
          </pre>
        </div>
      </main>
    </>
  )
}

export const Route = createFileRoute("/app/test")({
  component: RouteComponent,
})
