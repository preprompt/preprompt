import { Button } from "~/components/Button"

type ActionButtonProps = {
  icon?: React.ReactNode
  title: string
  onClick: () => void
}

const ActionButton = ({ icon, title, onClick }: ActionButtonProps) => (
  <button
    className="flex items-center justify-center rounded-2xl bg-inherit hover:bg-white/5 transition-colors duration-300 px-3 py-2 border border-white/10 text-neutral-200 text-md"
    onClick={onClick}
  >
    {icon}
    <span className="text-sm">{title}</span>
  </button>
)

export const ActionButtons = () => {
  const handleCode = () => {
    // Search functionality
  }

  const handleAddContext = () => {
    // Quick action functionality
  }

  const handleImage = () => {
    // Menu functionality
  }

  const handleCustomize = () => {
    // Customize functionality
  }

  const handleForward = () => {
    // Forward functionality
  }

  const handleHelp = () => {
    // Help functionality
  }

  return (
    <div className="w-full flex justify-center gap-4 mt-5">
      <ActionButton title="Code" onClick={handleCode} />
      <ActionButton title="Add Context" onClick={handleAddContext} />
      <ActionButton title="Image" onClick={handleImage} />
      <ActionButton title="Customize" onClick={handleCustomize} />
      <ActionButton title="Forward" onClick={handleForward} />
      <ActionButton title="Help" onClick={handleHelp} />
    </div>
  )
}
