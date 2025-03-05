import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFolder,
  faFolderOpen,
  faFile,
  faCode,
  faImage,
  faLink,
  faFont,
  faTable,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons"
import { cn } from "~/lib/utils"

export type WebsiteElement = {
  id: string
  name: string
  type:
    | "page"
    | "component"
    | "image"
    | "style"
    | "script"
    | "api"
    | "data"
    | "layout"
    | "section"
  url?: string
  selected?: boolean
  children?: WebsiteElement[]
}

type TreeItemProps = {
  node: WebsiteElement
  level: number
  onToggleExpand: (nodeId: string) => void
  onNodeSelect: (nodeId: string, selected: boolean) => void
  expandedNodes: Set<string>
  selectedNodes: Set<string>
}

const getIconForType = (type: string, isExpanded: boolean) => {
  switch (type) {
    case "page":
      return isExpanded ? faFolderOpen : faFolder
    case "component":
      return faCode
    case "image":
      return faImage
    case "style":
      return faFont
    case "script":
      return faCode
    case "api":
      return faLink
    case "data":
      return faTable
    case "layout":
      return isExpanded ? faFolderOpen : faFolder
    case "section":
      return isExpanded ? faFolderOpen : faFolder
    default:
      return faGlobe
  }
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  level,
  onToggleExpand,
  onNodeSelect,
  expandedNodes,
  selectedNodes,
}) => {
  const isExpanded = expandedNodes.has(node.id)
  const isSelected = selectedNodes.has(node.id)
  const hasChildren = node.children && node.children.length > 0

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) {
      onToggleExpand(node.id)
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNodeSelect(node.id, e.target.checked)
  }

  const icon = getIconForType(node.type, isExpanded)

  return (
    <div className="w-full">
      <div
        className="flex items-center py-1.5 px-3 my-0.5 rounded-lg hover:bg-white/5 transition-colors"
        style={{ paddingLeft: `${level * 10 + 8}px` }}
      >
        {hasChildren && (
          <button
            onClick={handleToggleExpand}
            className="mr-2 text-xs focus:outline-none"
          >
            <span className="text-xs">{isExpanded ? "—" : "•"}</span>
          </button>
        )}
        {!hasChildren && <div className="w-4 mr-2" />}

        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          className="mr-2"
          onClick={(e) => e.stopPropagation()}
        />

        <FontAwesomeIcon icon={icon} className="mr-2 text-sm" />

        <span className="truncate flex-1">{node.name}</span>

        {node.url && (
          <span className="text-xs text-gray-400 truncate max-w-32">
            {node.url}
          </span>
        )}
      </div>

      {isExpanded && hasChildren && (
        <div className="w-full">
          {node.children?.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              onToggleExpand={onToggleExpand}
              onNodeSelect={onNodeSelect}
              expandedNodes={expandedNodes}
              selectedNodes={selectedNodes}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeItem
