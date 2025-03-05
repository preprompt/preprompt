import { createFileRoute, Outlet } from "@tanstack/react-router"
import { JazzProvider } from "jazz-react"
import { JazzInspector } from "jazz-inspector"
import { JazzAccount } from "~/jazz-schema"

function LayoutComponent() {
  return (
    <>
      <JazzProvider
        sync={{
          peer: "wss://cloud.jazz.tools/?key=jazz@preprompt.app", // which server peer to sync jazz state with
          when: "signedUp", // this way when user hasn't signed up, data is stored locally
        }}
        AccountSchema={JazzAccount}
      >
        <Outlet />
        <JazzInspector />
      </JazzProvider>
    </>
  )
}

export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
})
