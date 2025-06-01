import { Skeleton } from "@/components/ui/skeleton"

export function ProviderCardSkeleton({ horizontal = false }: { horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden p-4 flex gap-4">
        <Skeleton className="h-28 w-28 md:h-32 md:w-32 rounded-md flex-shrink-0" />
        <div className="flex-grow space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="w-24 md:w-32 flex-shrink-0 flex flex-col items-end justify-between">
          <Skeleton className="h-5 w-12 self-end" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    )
  }
  // Original vertical skeleton
  return (
    <div className="shadow-soft rounded-xl border-0 overflow-hidden p-6 bg-white">
      <div className="text-center mb-4">
        <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
        <Skeleton className="h-5 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-24 mx-auto mb-3" />
        <div className="flex items-center justify-center gap-1 mb-2">
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-28 mx-auto mb-4" />
      </div>
      <div className="text-center mb-4">
        <Skeleton className="h-8 w-20 mx-auto mb-1" />
        <Skeleton className="h-3 w-32 mx-auto" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="shadow-soft rounded-xl border-0 overflow-hidden bg-light-gray p-6">
      <div className="text-center">
        <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
        <Skeleton className="h-6 w-24 mx-auto mb-4" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
    </div>
  )
}
