import { useState } from "react"
import Tree from "./Tree"
import { WebsiteElement } from "./TreeItem"
import { cn } from "~/lib/utils"

type SidebarProps = {
  className?: string
  onAnalyzeSelection?: (selectedElements: WebsiteElement[]) => void
}

const Sidebar: React.FC<SidebarProps> = ({ className, onAnalyzeSelection }) => {
  const [selectedElements, setSelectedElements] = useState<WebsiteElement[]>([])

  const websiteData: WebsiteElement[] = [
    {
      id: "1",
      name: "Home page",
      type: "page",
      url: "https://example.com",
      children: [
        {
          id: "1-1",
          name: "Header",
          type: "section",
          children: [
            { id: "1-1-1", name: "Logo", type: "image" },
            { id: "1-1-2", name: "Navigation", type: "component" },
            { id: "1-1-3", name: "Search button", type: "component" },
          ],
        },
        {
          id: "1-2",
          name: "Hero section",
          type: "section",
          children: [
            { id: "1-2-1", name: "Title", type: "component" },
            { id: "1-2-2", name: "Banner", type: "image" },
            { id: "1-2-3", name: "CTA button", type: "component" },
          ],
        },
        {
          id: "1-3",
          name: "Footer",
          type: "section",
          children: [
            { id: "1-3-1", name: "Links", type: "component" },
            { id: "1-3-2", name: "Contacts", type: "component" },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Products catalog",
      type: "page",
      url: "https://example.com/products",
      children: [
        {
          id: "2-1",
          name: "Filters",
          type: "component",
        },
        {
          id: "2-2",
          name: "Products list",
          type: "component",
          children: [
            { id: "2-2-1", name: "Product card", type: "component" },
            { id: "2-2-2", name: "Pagination", type: "component" },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "API Endpoints",
      type: "api",
      children: [
        { id: "3-1", name: "GET /products", type: "api", url: "/api/products" },
        {
          id: "3-2",
          name: "GET /categories",
          type: "api",
          url: "/api/categories",
        },
        { id: "3-3", name: "POST /order", type: "api", url: "/api/order" },
      ],
    },
    {
      id: "4",
      name: "Styles",
      type: "style",
      children: [
        {
          id: "4-1",
          name: "Main styles",
          type: "style",
          url: "/styles/main.css",
        },
        {
          id: "4-2",
          name: "Components",
          type: "style",
          url: "/styles/components.css",
        },
        { id: "4-3", name: "Themes", type: "style", url: "/styles/themes.css" },
      ],
    },
    {
      id: "5",
      name: "Scripts",
      type: "script",
      children: [
        { id: "5-1", name: "Main JS", type: "script", url: "/js/main.js" },
        {
          id: "5-2",
          name: "Analytics",
          type: "script",
          url: "/js/analytics.js",
        },
        { id: "5-3", name: "Utils", type: "script", url: "/js/utils.js" },
      ],
    },
  ]

  const handleSelectionChange = (elements: WebsiteElement[]) => {
    setSelectedElements(elements)
  }

  // const handleAnalyze = () => {
  //   if (onAnalyzeSelection && selectedElements.length > 0) {
  //     onAnalyzeSelection(selectedElements)
  //   }
  // }

  return (
    <div
      className={cn(
        "min-w-[20rem] bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border h-full overflow-y-auto flex flex-col",
        className,
      )}
    >
      <div className="p-4 flex-1 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Website elements</h2>
        <Tree data={websiteData} onSelectionChange={handleSelectionChange} />
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="mb-2">
          <span className="text-sm text-gray-400">
            Selected elements: {selectedElements.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
