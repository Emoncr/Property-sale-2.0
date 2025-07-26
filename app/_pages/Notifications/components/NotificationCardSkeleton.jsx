import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationCardSkeleton() {
    return (
        <div className="max-w-full mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-64" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-32" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                </div>
            </div>

            {/* For Donor Section */}
            <div className="space-y-6">
                <Skeleton className="h-5 w-20" />

                {/* Subject Field */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-2" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                </div>

                {/* Email Body Field */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-2" />
                    </div>
                    <div className="space-y-3 p-4 border rounded-md">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-1/3" />
                        <div className="space-y-2 pt-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        </div>
    )
}
