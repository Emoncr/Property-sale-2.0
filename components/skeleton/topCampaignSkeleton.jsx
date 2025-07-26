import { Search, Filter, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "../ui/skeleton"

export default function CampaignsTable() {
    return (
        <div className="p-6 max-w-full mx-auto">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-6">Top Campaigns</h1>

            {/* Search and Filter Bar */}
            <div className="hidden items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search" className="pl-10" />
                </div>
                <Button variant="outline" className="bg-white text-black">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium text-muted-foreground">Name</TableHead>
                            <TableHead className="font-medium text-muted-foreground">Goal</TableHead>
                            <TableHead className="font-medium text-muted-foreground">Raised</TableHead>
                            <TableHead className="font-medium text-muted-foreground">Status</TableHead>
                            <TableHead className="font-medium text-muted-foreground">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {/* Skeleton rows */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="hidden items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-white text-black">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white text-black">
                        <Skeleton className='w-12 h-6' />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white text-black">
                        <Skeleton className='w-12 h-6' />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white text-black">
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                        <Skeleton className='w-48 h-6' />
                    </span>
                    <Button variant="link" className="text-teal-600 hover:text-teal-700 p-0 h-auto">
                        See All
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
