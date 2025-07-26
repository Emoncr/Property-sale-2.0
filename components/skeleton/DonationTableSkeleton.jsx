import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"

const DonationTableSkeleton = () => {
    return (
        <div className="w-full space-y-4">
            {/* Table */}
            <div className="rounded-md border">
                {/* Table Header */}
                <div className="grid grid-cols-7 gap-4 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                    <div>Name</div>
                    <div>Campaign</div>
                    <div>Amount</div>
                    <div>Interval</div>
                    <div>Total</div>
                    <div>Status</div>
                    <div></div>
                </div>

                {/* Table Rows */}
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-7 gap-4 border-b px-4 py-4 items-center">
                        {/* Name */}
                        <div>
                            <Skeleton className="h-4 w-24" />
                        </div>

                        {/* Campaign */}
                        <div>
                            <Skeleton className="h-4 w-48" />
                        </div>

                        {/* Amount */}
                        <div>
                            <Skeleton className="h-4 w-12" />
                        </div>

                        {/* Interval */}
                        <div>
                            <Skeleton className="h-4 w-16" />
                        </div>

                        {/* Total */}
                        <div>
                            <Skeleton className="h-4 w-16" />
                        </div>

                        {/* Status */}
                        <div>
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end">
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Rows per page</span>
                        <Skeleton className="h-8 w-16" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-20" />
                        <div className="flex space-x-1">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonationTableSkeleton
