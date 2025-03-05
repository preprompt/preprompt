import { QueryClient } from "@tanstack/react-query"
import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routerWithQueryClient } from "@tanstack/react-router-with-query"
import { JazzInspector } from "jazz-inspector"
import { JazzProvider } from "jazz-react"
import { JazzAccount } from "~/jazz-schema"
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary"
import { NotFound } from "./components/NotFound"
import { routeTree } from "./routeTree.gen"

export function createRouter() {
  const queryClient = new QueryClient()
  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: "intent",
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      InnerWrap: ({ children }) => {
        return (
          <>
            <JazzProvider
              sync={{
                peer: "wss://cloud.jazz.tools/?key=jazz@preprompt.app", // which server peer to sync jazz state with
                when: "signedUp", // this way when user hasn't signed up, data is stored locally
              }}
              AccountSchema={JazzAccount}
            >
              {children}
              <JazzInspector />
            </JazzProvider>
          </>
        )
      },
    }),
    queryClient,
  )
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
