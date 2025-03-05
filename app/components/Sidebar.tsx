import { useState, useEffect } from "react"
import Tree from "./Tree"
import { WebsiteElement } from "./TreeItem"
import { cn } from "~/lib/utils"

type SidebarProps = {
  className?: string
  onAnalyzeSelection?: (selectedElements: WebsiteElement[]) => void
}

const Sidebar: React.FC<SidebarProps> = ({ className, onAnalyzeSelection }) => {
  const [selectedElements, setSelectedElements] = useState<WebsiteElement[]>([])
  const [showSortModal, setShowSortModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)
  const [filterType, setFilterType] = useState<string | null>(null)
  const [websiteData, setWebsiteData] = useState<WebsiteElement[]>([
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
  ])

  const [originalData] = useState<WebsiteElement[]>(
    JSON.parse(JSON.stringify(websiteData)),
  )

  const handleSelectionChange = (elements: WebsiteElement[]) => {
    setSelectedElements(elements)
  }

  const applySorting = (order: "asc" | "desc") => {
    setSortOrder(order)

    const sortedData = JSON.parse(
      JSON.stringify(websiteData),
    ) as WebsiteElement[]

    const sortElements = (elements: WebsiteElement[]): WebsiteElement[] => {
      return elements
        .sort((a, b) => {
          const comparison = a.name.localeCompare(b.name)
          return order === "asc" ? comparison : -comparison
        })
        .map((element) => {
          if (element.children && element.children.length > 0) {
            return {
              ...element,
              children: sortElements(element.children),
            }
          }
          return element
        })
    }

    setWebsiteData(sortedData.length > 0 ? sortElements(sortedData) : [])
    setShowSortModal(false)
  }

  const applyFilter = (type: string | null) => {
    setFilterType(type)

    if (type === null) {
      setWebsiteData(JSON.parse(JSON.stringify(originalData)))
      setShowFilterModal(false)
      return
    }

    const dataToFilter = JSON.parse(
      JSON.stringify(originalData),
    ) as WebsiteElement[]

    const filterElements = (elements: WebsiteElement[]): WebsiteElement[] => {
      return elements
        .filter((element) => type === null || element.type === type)
        .map((element) => {
          if (element.children && element.children.length > 0) {
            const filteredChildren = filterElements(element.children)
            return {
              ...element,
              children: filteredChildren,
            }
          }
          return element
        })
        .filter(
          (element) =>
            type === null ||
            element.type === type ||
            (element.children && element.children.length > 0),
        )
    }

    setWebsiteData(filterElements(dataToFilter))
    setShowFilterModal(false)
  }

  const handleClear = () => {
    setSortOrder(null)
    setFilterType(null)

    setWebsiteData(JSON.parse(JSON.stringify(originalData)))
  }

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized && onAnalyzeSelection) {
      onAnalyzeSelection(selectedElements)
    }
  }, [initialized, onAnalyzeSelection, selectedElements])

  return (
    <div
      className={cn(
        "min-w-[20rem] bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border h-full overflow-y-auto flex flex-col",
        className,
      )}
    >
      <div className="p-4 flex-1 overflow-auto">
        <div className="flex flex-row items-center space-x-2 mb-4">
          <button
            onClick={() => setShowSortModal(!showSortModal)}
            className={cn(
              "px-3 py-1 text-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors",
              sortOrder && "bg-white/10",
            )}
          >
            Sort
          </button>
          <button
            onClick={() => setShowFilterModal(!showFilterModal)}
            className={cn(
              "px-3 py-1 text-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors",
              filterType && "bg-white/10",
            )}
          >
            Filter
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 text-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            Clear
          </button>
        </div>

        {showSortModal && (
          <div className="mb-4 p-3 bg-white/5 rounded-md">
            <h3 className="text-sm font-medium mb-2">Sort elements</h3>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => applySorting("asc")}
                className={cn(
                  "text-left px-3 py-1.5 text-sm rounded-md hover:bg-white/10 transition-colors",
                  sortOrder === "asc" && "bg-white/10",
                )}
              >
                A to Z (ascending)
              </button>
              <button
                onClick={() => applySorting("desc")}
                className={cn(
                  "text-left px-3 py-1.5 text-sm rounded-md hover:bg-white/10 transition-colors",
                  sortOrder === "desc" && "bg-white/10",
                )}
              >
                Z to A (descending)
              </button>
            </div>
          </div>
        )}

        {showFilterModal && (
          <div className="mb-4 p-3 bg-white/5 rounded-md">
            <h3 className="text-sm font-medium mb-2">Filter by type</h3>
            <div className="flex flex-col space-y-2">
              {[
                "page",
                "section",
                "component",
                "image",
                "api",
                "style",
                "script",
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => applyFilter(type)}
                  className={cn(
                    "text-left px-3 py-1.5 text-sm rounded-md hover:bg-white/10 transition-colors",
                    filterType === type && "bg-white/10",
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
              <button
                onClick={() => applyFilter(null)}
                className="text-left px-3 py-1.5 text-sm rounded-md hover:bg-white/10 transition-colors"
              >
                Show all
              </button>
            </div>
          </div>
        )}

        {filterType && (
          <div className="mb-3 px-2 py-1 bg-white/5 rounded-md text-xs inline-block">
            Filter: <span className="font-semibold">{filterType}</span>
            <button
              onClick={() => applyFilter(null)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        )}

        <Tree data={websiteData} onSelectionChange={handleSelectionChange} />
      </div>
    </div>
  )
}

export default Sidebar
