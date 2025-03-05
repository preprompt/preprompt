import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: "/app" })
  }, [navigate])
  return <></>
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

// TODO: doing things in /app for now as this makes sure that Jazz context loads only on client
// there should be a way to avoid doing this
