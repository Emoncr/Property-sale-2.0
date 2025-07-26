"use client";

import * as React from "react";
import useSWR from "swr";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Loader,
  MoreVertical,
  Plus,
  Search,
  XCircle,
  DollarSign,
  Eye,
  Trash,
  X,
  RefreshCw,
  Undo2,
  FileDown,
  Funnel,
  Dot,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import DonationPreview from "@/app/_pages/Donations/components/DonationPreview";
import DeleteModal from "@/components/common/DeleteModal";
import donationApis from "../utils/donationApis";
import { useRouter, useSearchParams } from "next/navigation";
import FilterTab from "./FilterTab";
import { fetchApi } from "@/utils/apiMaker";
import { mutate } from "swr";
import ConfirmationAlert from "@/components/common/ConfirmationAlert";
import DonationTableSkeleton from "@/components/skeleton/DonationTableSkeleton";
import DonationExport from "./DonationExport";

const getStatusBadge = (status) => {
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const statusConfig = {
    succeeded: {
      className:
        "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      icon: CheckCircle2,
    },
    pending: {
      className:
        "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
      icon: Clock,
    },
    failed: {
      className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      icon: XCircle,
    },
    cancelled: {
      className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      icon: XCircle,
    },
    refunded: {
      className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      icon: RefreshCw,
    },
    initiated: {
      className:
        "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
      icon: Loader,
    },
  };

  const config = statusConfig[status] || {
    className: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
    icon: Clock,
  };

  const IconComponent = config.icon;

  return (
    <Badge
      className={`font-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors cursor-pointer ${config.className}`}
    >
      <IconComponent
        className={`size-3 ${status === "processing" ? "animate-spin" : ""}`}
      />
      {formattedStatus}
    </Badge>
  );
};

export function DonationsTable({ pageHeading, setPageHeading }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [previewDonation, setPreviewDonation] = React.useState(null);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = React.useState({
    website: "all",
    campaign: "all",
    status: "all",
    isRefunded: "all",
    minAmount: "",
    maxAmount: "",
    currency: "all",
    startDate: "",
    endDate: "",
    donationType: "all",
    recurringInterval: "all",
    isAnonymousDonation: "all",
    donorType: "all",
    country: "all",
  });

  const params = useSearchParams();

  // Handle URL params for donation type
  React.useEffect(() => {
    const donationType = params.get("donationType");
    if (donationType && ["one-time", "recurring"].includes(donationType)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        donationType: donationType,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        donationType: "all",
      }));
    }
  }, [params]);

  // Update page heading based on donation type
  React.useEffect(() => {
    if (filters.donationType === "one-time") {
      setPageHeading("One Time Donations");
    } else if (filters.donationType === "recurring") {
      setPageHeading("Recurring Donations");
    } else {
      setPageHeading("Donations");
    }
  }, [filters.donationType, setPageHeading]);

  // Reset pagination when filters change
  React.useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [filters, searchValue]);

  // ===============BUILDING API PATH FOR FILTERING DATA ==================//
  const buildApiPath = React.useMemo(() => {
    let path = `?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`;

    // Search
    if (searchValue) {
      path += `&search=${encodeURIComponent(searchValue)}`;
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      path += `&filters[status]=${filters.status}`;
    }

    // Website filter
    if (filters.website && filters.website !== "all") {
      path += `&filters[website]=${filters.website}`;
    }

    // Campaign filter
    if (filters.campaign && filters.campaign !== "all") {
      path += `&filters[campaign]=${filters.campaign}`;
    }

    // Refunded filter
    if (filters.isRefunded && filters.isRefunded !== "all") {
      path += `&filters[isRefunded]=${filters.isRefunded}`;
    }

    // Amount range filters
    if (filters.minAmount) {
      path += `&filters[minAmount]=${filters.minAmount}`;
    }
    if (filters.maxAmount) {
      path += `&filters[maxAmount]=${filters.maxAmount}`;
    }

    // Currency filter
    if (filters.currency && filters.currency !== "all") {
      path += `&filters[currency]=${filters.currency}`;
    }

    // Date range filters
    if (filters.startDate) {
      path += `&filters[startDate]=${filters.startDate}`;
    }
    if (filters.endDate) {
      path += `&filters[endDate]=${filters.endDate}`;
    }

    // Donation type filter
    if (filters.donationType && filters.donationType !== "all") {
      path += `&filters[donationType]=${filters.donationType}`;
    }

    // Recurring interval filter
    if (filters.recurringInterval && filters.recurringInterval !== "all") {
      path += `&filters[recurringInterval]=${filters.recurringInterval}`;
    }

    // Anonymous donation filter
    if (filters.isAnonymousDonation && filters.isAnonymousDonation !== "all") {
      path += `&filters[isAnonymousDonation]=${filters.isAnonymousDonation}`;
    }

    // Donor type filter
    if (filters.donorType && filters.donorType !== "all") {
      path += `&filters[donorType]=${filters.donorType}`;
    }

    // Country filter
    if (filters.country && filters.country !== "all") {
      path += `&filters[country]=${filters.country}`;
    }

    return path;
  }, [pagination.pageIndex, pagination.pageSize, searchValue, filters]);

  const cacheKey = React.useMemo(() => {
    return `donations-${JSON.stringify(filters)}-${pagination.pageIndex}-${
      pagination.pageSize
    }-${searchValue || "all"}`;
  }, [filters, pagination.pageIndex, pagination.pageSize, searchValue]);

  // ===============FETCHING DATA ==================//
  const { data, error, isLoading } = useSWR(
    cacheKey,
    fetchApi({
      endpoint: `/donations`,
      path: buildApiPath,
      method: "GET",
    }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  const donations = React.useMemo(() => data?.data?.items || [], [data]);
  const paginationData = data?.data?.pagination;

  const handlePreview = (data) => {
    setPreviewDonation(data);
    setIsPreviewOpen(true);
  };

  // ===============CHECKING ACTIVE FILTERS ==================//
  const hasActiveFilters = React.useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (typeof value === "string") {
        return value !== "all" && value !== "";
      }
      return false;
    });
  }, [filters]);

  const handleDonationExport = () => {};

  // ===============COLUMNS FOR TABLE ==================//
  const columns = [
    {
      accessorKey: "donor",
      header: "Name",
      cell: ({ row }) => {
        const donor = row.original.donor;
        return (
          <Button onClick={() => handlePreview(row.original)} variant="ghost">
            <span className="font-primary font-medium ">
              {(donor?.firstName === "N/A" && donor?.lastName === "N/A") ||
              (!donor?.firstName && !donor?.lastName)
                ? `${donor?.organizationName || "Unknown"}`
                : `${donor?.firstName || ""} ${donor?.lastName || ""}`.trim()}
            </span>
          </Button>
        );
      },
    },
    {
      accessorKey: "campaign.name",
      header: "Campaign",
      cell: ({ row }) => (
        <span className="font-primary">
          {row.original.campaign?.name || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-primary font-medium text-primary">
          ${row.original.amount?.toLocaleString() || "0"}
        </span>
      ),
    },
    {
      accessorKey: "recurringInterval",
      header: "Interval",
      cell: ({ row }) => (
        <span className="font-primary">
          {row.original.recurringInterval || "One-time"}
        </span>
      ),
    },
    {
      accessorKey: "netAmount",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-primary font-medium">
          ${row.original.netAmount?.toLocaleString() || "0"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="inline-flex">{getStatusBadge(row.original.status)}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted hover:bg-primary/10 hover:text-primary"
              size="icon"
            >
              <MoreVertical className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 font-primary">
            <DropdownMenuItem
              className="cursor-pointer hover:bg-primary/10 flex items-center gap-2"
              onClick={() => handlePreview(row.original)}
            >
              <Eye className="size-4" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ConfirmationAlert
              id={row?.original?._id}
              title={`Are you sure you want to refund ${
                row?.original?.name || "this donation"
              }?`}
              description={`You can undo this action later. This action will refund ${row?.original?.amount} ${row?.original?.currency} to ${row?.original?.donor?.firstName} ${row?.original?.donor?.lastName}.`}
              cacheKey={cacheKey}
              requestEndpoint={donationApis.updateRefund(row?.original?._id)}
              handleDone={(data) => {
                const updatedDonation = data?.data;
                if (updatedDonation) {
                  mutate(cacheKey, (prev) => {
                    if (!prev?.data || !Array.isArray(prev.data)) return prev;
                    const updatedDonation = data?.data;
                    return {
                      ...prev,
                      data: prev.data.map((donation) =>
                        donation._id === updatedDonation._id
                          ? { ...donation, status: updatedDonation.status }
                          : donation
                      ),
                    };
                  });
                }
              }}
              disabled={row?.original?.status !== "succeeded"}
            >
              <DropdownMenuItem
                onSelect={(event) => event.preventDefault()}
                className="cursor-pointer text-primary hover:bg-blue-50"
                disabled={row?.original?.status !== "succeeded"}
              >
                <Undo2 className="size-4" />
                Refund
              </DropdownMenuItem>
            </ConfirmationAlert>
            <DropdownMenuSeparator />

            <DeleteModal
              id={row?.original?._id}
              title={row?.original?.name || "this donation"}
              cacheKey={cacheKey}
              deleteRequest={donationApis.delete(row?.original?._id)}
              handleDone={async () => {
                const updatedDonation = data?.data;
                if (updatedDonation) {
                  mutate(cacheKey, (prev) => {
                    if (!Array.isArray(prev?.data)) return prev;
                    return {
                      ...prev,
                      data: prev.data.map((donation) =>
                        donation._id === updatedDonation._id
                          ? { ...donation, status: updatedDonation.status }
                          : donation
                      ),
                    };
                  });
                }
              }}
            >
              <DropdownMenuItem
                className="cursor-pointer text-destructive hover:bg-destructive/10 flex items-center gap-2"
                onSelect={(event) => event.preventDefault()}
              >
                <Trash className="size-4" />
                Delete
              </DropdownMenuItem>
            </DeleteModal>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: donations,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row._id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: paginationData?.totalPages || 1,
  });

  if (error) {
    return (
      <div className="font-primary flex items-center justify-center p-8 text-destructive">
        <XCircle className="size-6 mr-2" />
        Error loading donations: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start gap-6 w-full">
      {/* Header with Search and Actions */}
      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-4 w-full">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search donors, campaigns..."
              className="font-primary h-10 w-full rounded-lg pl-10 pr-4 focus-visible:ring-2 focus-visible:ring-primary"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DonationExport
            filters={filters}
            searchValue={searchValue}
            pagination={pagination}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsFilterOpen(true)}
            className="font-primary bg-primary hover:bg-primary/90 w-full relative"
          >
            <Funnel className="size-5" />
            <span>Filter</span>
            {/* Animated ping indicator - shows when filters are active */}
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <DonationTableSkeleton />
      ) : (
        <div className="relative flex flex-col gap-4 overflow-auto">
          <div className="overflow-hidden rounded-lg border border-border">
            <Table className="font-primary">
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className="font-primary font-medium text-foreground"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="font-primary">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="font-primary hover:bg-muted/50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="font-primary h-24 text-center text-muted-foreground"
                    >
                      {searchValue
                        ? "No matching donations found"
                        : "No donations available"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4">
            <div className="font-primary hidden flex-1 text-sm text-muted-foreground lg:flex">
              Showing {donations.length} of {paginationData?.totalItems || 0}{" "}
              donations
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="font-primary hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger
                    className="font-primary w-20"
                    id="rows-per-page"
                  >
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent className="font-primary">
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem
                        key={pageSize}
                        value={`${pageSize}`}
                        className="font-primary"
                      >
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="font-primary flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="font-primary hidden h-8 w-8 p-0 lg:flex hover:bg-primary/10 hover:text-primary"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="font-primary size-8 hover:bg-primary/10 hover:text-primary"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="font-primary size-8 hover:bg-primary/10 hover:text-primary"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="font-primary hidden size-8 lg:flex hover:bg-primary/10 hover:text-primary"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Sidebar */}
      <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <SheetContent className="w-full max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] overflow-y-scroll ">
          <SheetHeader>
            <SheetTitle>Donation Details</SheetTitle>
            <SheetDescription>
              View and manage donation information
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {previewDonation && (
              <DonationPreview
                donationData={previewDonation}
                setPreviewDonation={setPreviewDonation}
                onClose={() => setIsPreviewOpen(false)}
                key={previewDonation._id}
                getStatusBadge={getStatusBadge}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Filter Sidebar */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent className="overflow-y-scroll ">
          <SheetHeader>
            <SheetTitle>Donation Filters</SheetTitle>
            <SheetDescription>Filter and sort donations</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <FilterTab setFilters={setFilters} filters={filters} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}