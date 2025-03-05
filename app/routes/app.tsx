import { createFileRoute, Outlet } from "@tanstack/react-router"
import { JazzProvider } from "jazz-react"
import { ChatAccount } from "../jazz-schema"
import { JazzInspector } from "jazz-inspector"

function LayoutComponent() {
  return (
    <>
      <JazzProvider
        AccountSchema={ChatAccount}
        // TODO: should be diff maybe
        sync={{
          peer: "wss://cloud.jazz.tools/?key=jazz@preprompt.app",
        }}
      >
        <Outlet />
        <JazzInspector />
      </JazzProvider>
    </>
  )
}

export const Route = createFileRoute("/app")({
  component: LayoutComponent,
})
