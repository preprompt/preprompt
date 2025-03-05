import { useForm } from "@tanstack/react-form"
import { createFileRoute } from "@tanstack/react-router"
import { useAccount, useIsAuthenticated } from "jazz-react"
import { AuthButton } from "~/components/AuthButton"
import { Website } from "~/jazz-schema"

function RouteComponent() {
  const { me } = useAccount({ profile: {}, root: { websites: {} } })
  const isAuthenticated = useIsAuthenticated()

  const profileForm = useForm({
    defaultValues: {
      username: me?.profile?.username || "",
    },
    onSubmit: async ({ value }) => {
      if (me?.profile) {
        me.profile.username = value.username
      }
    },
  })

  const websiteForm = useForm({
    defaultValues: {
      name: "",
      url: "",
    },
    onSubmit: async ({ value }) => {
      if (me?.root?.websites) {
        const group = Group.create()
        const newWebsite = Website.create(
          {
            name: value.name,
            url: value.url,
            urls: [], // Initialize with empty URLs list
          },
          group,
        )
        me.root.websites.push(newWebsite)
      }
    },
  })

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
            {JSON.stringify(me?.root, null, 2)}
          </pre>
        </div>

        {/* Profile Form */}
        <div className="bg-white/5 rounded-lg p-6 shadow-lg max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Welcome, {me?.profile?.username || "User"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              profileForm.handleSubmit()
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <profileForm.Field
                name="username"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Username is required"
                      : value.length < 3
                        ? "Username must be at least 3 characters"
                        : undefined,
                }}
              >
                {(field) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {field.state.meta.isTouched &&
                    field.state.meta.errors.length ? (
                      <em className="text-red-500 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </>
                )}
              </profileForm.Field>
            </div>
            <profileForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                    canSubmit
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
              )}
            </profileForm.Subscribe>
          </form>
        </div>

        {/* Website Form */}
        <div className="bg-white/5 rounded-lg p-6 shadow-lg max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Add Website</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              websiteForm.handleSubmit()
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <websiteForm.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Website name is required" : undefined,
                }}
              >
                {(field) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium"
                    >
                      Website Name
                    </label>
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {field.state.meta.isTouched &&
                    field.state.meta.errors.length ? (
                      <em className="text-red-500 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </>
                )}
              </websiteForm.Field>

              <websiteForm.Field
                name="url"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "URL is required"
                      : !/^https?:\/\/.+/.test(value)
                        ? "Please enter a valid URL starting with http:// or https://"
                        : undefined,
                }}
              >
                {(field) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium"
                    >
                      Website URL
                    </label>
                    <input
                      type="url"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {field.state.meta.isTouched &&
                    field.state.meta.errors.length ? (
                      <em className="text-red-500 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </>
                )}
              </websiteForm.Field>
            </div>

            <websiteForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                    canSubmit
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Adding..." : "Add Website"}
                </button>
              )}
            </websiteForm.Subscribe>
          </form>
        </div>

        {/* Display Websites */}
        <div className="bg-white/5 rounded-lg p-6 shadow-lg max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Websites</h2>
          <div className="space-y-4">
            {me?.root?.websites?.map((website, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-bold">{website.name}</h3>
                <a
                  href={website.url}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {website.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute("/_app/test/crud")({
  component: RouteComponent,
})
