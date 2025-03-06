import { useState } from "react"
import { cn } from "~/lib/utils"

// type UserProps = {
//   username?: string
// }

export default function User({ username = "User" }: { username?: string }) {
  const [showUserModal, setShowUserModal] = useState(false)

  const handleLogout = () => {
    console.log("Logging out...")
  }

  return (
    <div className="relative">
      <button
        id="user-button"
        onClick={() => setShowUserModal(!showUserModal)}
        className="flex items-center space-x-2 p-1 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
          {username.charAt(0).toUpperCase()}
        </div>
      </button>

      {showUserModal && (
        <div
          id="user-modal"
          className="absolute right-0 top-12 p-2 bg-[#2b2b2bb9] backdrop-blur-sm rounded-2xl z-10 whitespace-nowrap"
        >
          <div className="flex flex-col">
            <button
              onClick={() => {
                setShowUserModal(false)
                document
                  .getElementById("settings-modal-container")
                  ?.classList.remove("hidden")
              }}
              className="text-left px-3 py-2 text-sm rounded-xl text-white/80 hover:bg-white/5 transition-colors duration-75"
            >
              Settings
            </button>
            <button className="text-left px-3 py-2 text-sm rounded-xl text-white/80 hover:bg-white/5 transition-colors duration-75">
              Feedback & Support
            </button>
            <button
              onClick={handleLogout}
              className="text-left px-3 py-2 text-sm rounded-xl hover:bg-white/5 transition-colors text-white/80 duration-75"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      <div
        id="settings-modal-container"
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            document
              .getElementById("settings-modal-container")
              ?.classList.add("hidden")
          }
        }}
      >
        <div className="bg-[#2b2b2bb9] backdrop-blur-sm p-6 rounded-2xl w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Settings</h2>
            <button
              onClick={() =>
                document
                  .getElementById("settings-modal-container")
                  ?.classList.add("hidden")
              }
              className="text-white/80 text-lg hover:text-white hover:bg-white/10 w-8 h-8 flex items-center p-auto justify-center rounded-xl transition-colors duration-75"
            >
              ×
            </button>
          </div>
          <div className="py-4">
            <p className="text-white/80 text-center">something</p>
          </div>
        </div>
      </div>
    </div>
  )
}
