import { createFileRoute } from "@tanstack/react-router"
import { url } from "inspector"
import { useAccount, useIsAuthenticated } from "jazz-react"
import { ListOfUrls, Website } from "~/jazz-schema"

function RouteComponent() {
  const { me } = useAccount({ profile: {}, root: { websites: {} } })
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated) {
    // TODO: redirect to /test
    return <div>Not authenticated</div>
  }
  console.log(me, "me")

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen w-full max-w-2xl mx-auto p-5">
      <main className="container flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Website CRUD Operations</h1>
        <div className="flex flex-col gap-4">
          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-3">Create Website</h2>
            <div className="flex gap-4 items-end">
              <div className="flex flex-col gap-1 flex-grow">
                <label htmlFor="website-name" className="text-sm font-medium">
                  Website Name
                </label>
                <input
                  id="website-name"
                  type="text"
                  className="px-3 py-2 border rounded-md"
                  placeholder="My Website"
                />
              </div>
              <div className="flex flex-col gap-1 flex-grow">
                <label htmlFor="website-url" className="text-sm font-medium">
                  Website URL
                </label>
                <input
                  id="website-url"
                  type="text"
                  className="px-3 py-2 border rounded-md"
                  placeholder="https://example.com"
                />
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  const nameInput = document.getElementById(
                    "website-name",
                  ) as HTMLInputElement
                  const urlInput = document.getElementById(
                    "website-url",
                  ) as HTMLInputElement

                  if (nameInput.value && urlInput.value) {
                    console.log(me, "me")
                    console.log(me?.websites)
                    return
                    // const newWebsite = Website.create(
                    //   {
                    //     name: nameInput.value,
                    //     url: urlInput.value,
                    //     urls: ListOfUrls.create([]),
                    //   },
                    //   { owner: me },
                    // )

                    // me?.websites.push(newWebsite)
                    // nameInput.value = ""
                    // urlInput.value = ""
                  }
                }}
              >
                Create Website
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-3">Your Websites</h2>
            <div className="flex flex-col gap-2">
              {/* {me?.root.websites.map((website, index) => (
                <div
                  key={index}
                  className="p-3 border rounded flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{website.name}</h3>
                    <p className="text-sm text-gray-600">{website.url}</p>
                  </div>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                    onClick={() => {
                      me?.websites.splice(index, 1)
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {me.root.websites.length === 0 && (
                <p className="text-gray-500 italic">
                  No websites yet. Create one above!
                </p>
              )} */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute("/_app/test/crud")({
  component: RouteComponent,
})
