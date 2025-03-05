import { createFileRoute, Outlet } from "@tanstack/react-router"
import { JazzProvider } from "jazz-react"
import { JazzInspector } from "jazz-inspector"
import { JazzAccount } from "~/jazz-schema"

function LayoutComponent() {
  return (
    <>
      <JazzProvider
        AccountSchema={JazzAccount}
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
