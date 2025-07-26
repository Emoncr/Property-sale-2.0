"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Sample data
const subscriptionsData = [
  {
    _id: "1",
    campaign: { name: "General Fund" },
    goal: "$10000.00",
    amount: 1.01,
    frequency: "Biweekly",
    status: "active",
    endDate: "N/A",
  },
  {
    _id: "2",
    campaign: { name: "General Fund" },
    goal: "$10000.00",
    amount: 5.05,
    frequency: "Annually",
    status: "active",
    endDate: "N/A",
  },
  {
    _id: "3",
    campaign: { name: "General Fund" },
    goal: "$10000.00",
    amount: 1.01,
    frequency: "Biweekly",
    status: "active",
    endDate: "N/A",
  },
  {
    _id: "4",
    campaign: { name: "General Fund" },
    goal: "$10000.00",
    amount: 1.01,
    frequency: "Biweekly",
    status: "active",
    endDate: "N/A",
  },
  {
    _id: "5",
    campaign: { name: "General Fund" },
    goal: "$10000.00",
    amount: 1.0,
    frequency: "Monthly",
    status: "incomplete",
    endDate: "N/A",
  },
  {
    _id: "6",
    campaign: { name: "General Fund" },
    goal: "$10000.00",
    amount: 1.0,
    frequency: "Monthly",
    status: "incomplete",
    endDate: "N/A",
  },
  {
    _id: "7",
    campaign: { name: "General Fund" },
    goal: "$10000.00",
    amount: 1.0,
    frequency: "Monthly",
    status: "active",
    endDate: "N/A",
  },
];

const StatusBadge = ({ status }) => {
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const statusConfig = {
    active: {
      className:
        "bg-emerald-100 text-emerald-700 border-emerald-100 font-primary",
      dotColor: "bg-emerald-500",
      textColor: "text-emerald-700",
    },
    incomplete: {
      className: "bg-rose-50 text-rose-700 border-rose-100 font-primary",
      dotColor: "bg-rose-500",
      textColor: "text-rose-700",
    },
  };

  const config = statusConfig[status] || {
    className: "bg-gray-50 text-gray-700 border-gray-100 font-primary",
    dotColor: "bg-gray-500",
    textColor: "text-gray-700",
  };

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
      <span className={config.textColor}>{formattedStatus}</span>
    </Badge>
  );
};

const SubscriptionTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(subscriptionsData.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = subscriptionsData.slice(startIndex, endIndex);

  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < totalPages - 1;

  const goToFirstPage = () => setCurrentPage(0);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(0, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  const goToLastPage = () => setCurrentPage(totalPages - 1);

  return (
    <>
      <CardContent className="!px-0">
        <div className="relative flex flex-col gap-4 overflow-auto">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-gray-50">
                <TableRow className="hover:bg-gray-50">
                  <TableHead className="font-medium text-gray-700">
                    Campaign
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Amount
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Interval
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Total
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Last Donation
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length ? (
                  currentData.map((subscription) => (
                    <TableRow
                      key={subscription._id}
                      className="hover:bg-gray-50/50 border-b"
                    >
                      <TableCell className="py-4">
                        <div>
                          <div className="font-medium text-gray-900 font-primary">
                            {subscription.campaign.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <div className="font-medium text-gray-900 font-primary">
                            ${subscription.amount.toFixed(2)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <div className="font-medium text-gray-900 font-primary">
                            {subscription.frequency}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <div className="font-medium text-gray-900 font-primary">
                            {subscription.goal}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <div className="font-medium text-gray-900 font-primary">
                            {subscription.amount}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 flex">
                        <StatusBadge status={subscription.status} />
                      </TableCell>
                      <TableCell className="py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-primary"
                        >
                          Unsubscribe
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-gray-500"
                    >
                      No subscriptions available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="hidden flex-1 text-sm text-gray-500 lg:flex">
              Showing {startIndex + 1}-
              {Math.min(endIndex, subscriptionsData.length)} of{" "}
              {subscriptionsData.length} subscriptions
            </div>
            <div className="flex w-full items-center justify-between gap-4 lg:w-fit">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="rows-per-page"
                  className="text-sm text-gray-500"
                >
                  Rows per page
                </Label>
                <Select
                  value={pageSize}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setCurrentPage(0);
                  }}
                >
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20, 30, 40, 50].map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  Page {currentPage + 1} of {totalPages}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={goToFirstPage}
                    disabled={!canPreviousPage}
                  >
                    <ChevronsLeft className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={goToPreviousPage}
                    disabled={!canPreviousPage}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={goToNextPage}
                    disabled={!canNextPage}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={goToLastPage}
                    disabled={!canNextPage}
                  >
                    <ChevronsRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default SubscriptionTable;
