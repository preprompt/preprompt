import { createFileRoute } from "@tanstack/react-router"
import { useAccount, useIsAuthenticated } from "jazz-react"
import { AuthButton } from "~/components/AuthButton"

function RouteComponent() {
  const { me } = useAccount({ profile: {}, root: {} })
  const isAuthenticated = useIsAuthenticated()
  console.log(isAuthenticated, "isAuthenticated")

  const calculateAge = () => {
    return 30
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen w-full max-w-2xl mx-auto p-5">
      <header>
        <nav className="container flex flex-row gap-4 justify-between items-center py-3">
          {isAuthenticated ? (
            <span></span>
          ) : (
            <span>Auth to share data with another device</span>
          )}
          <AuthButton />
        </nav>
      </header>
      <main className="container flex flex-col gap-8">
        <div className="text-center">
          <pre className="text-left text-sm inline-block bg-white/50 p-4 rounded-lg overflow-auto max-w-full">
            {JSON.stringify(me?.root)}
          </pre>
        </div>
        <div>
          <div className="bg-white/5 rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Welcome, {me?.profile?.name || "User"}!
            </h2>
            <p className="text-center mb-6">
              As of today, you are {calculateAge()} years old.
            </p>
            <p className="text-center italic mb-8">Bio: bio</p>

            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue={me?.profile?.name || ""}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium"
                >
                  Date of birth
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="dateOfBirth"
                    defaultValue="12/04/1995"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="block text-sm font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  defaultValue={me?.root?.bio || "new"}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute("/app/test")({
  component: RouteComponent,
})
