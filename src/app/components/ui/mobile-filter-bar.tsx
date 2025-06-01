import { Button } from "@/components/ui/button"
import { Filter, Map } from "lucide-react"

interface MobileFilterBarProps {
  onFilterClick: () => void
  onMapClick: () => void
  showMap: boolean
}

export default function MobileFilterBar({ onFilterClick, onMapClick, showMap }: MobileFilterBarProps) {
  return (
    <div className="sticky top-20 z-40 bg-white border-b border-gray-200 md:hidden">
      <div className="flex justify-between items-center p-4 gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterClick}
          className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button
          variant={showMap ? "default" : "outline"}
          size="sm"
          onClick={onMapClick}
          className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2"
        >
          <Map className="w-4 h-4" />
          {showMap ? "List View" : "Map View"}
        </Button>
      </div>
    </div>
  )
}