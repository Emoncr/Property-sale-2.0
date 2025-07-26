"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dashboardRootApis from "../utils/apis";
import useRequest from "@/hooks/useRequest";
import useSWR from "swr";


const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <TableCell className="font-primary">
        <div className="space-y-1">
          <div className="font-medium">
            {row.original.firstName} {row.original.lastName}
          </div>
          <div className="text-sm text-muted-foreground">
            {row.original._id}
          </div>
        </div>
      </TableCell>
    )
  },
  {
    accessorKey: "amountDonated",
    header: "Amount Donated",
    cell: ({ row }) => (
      <TableCell className="font-primary">
        {formatCurrency(row.original.totalDonated)}
      </TableCell>
    )
  },
  {
    accessorKey: "donationCount",
    header: "Donation Count",
    cell: ({ row }) => (
      <TableCell className="font-primary">
        {row.original.donationCount}
      </TableCell>
    )
  },
  {
    accessorKey: "lastDonationDate",
    header: "Last Donation Date",
    cell: ({ row }) => (
      <TableCell className="font-primary">
        {formatDate(row.original.lastDonationDate)}
      </TableCell>
    )
  },
];



export default function TopDonorsTable() {

  const { data: donorsData, error, isLoading } = useSWR(
    dashboardRootApis.donnerCacheKey,
    dashboardRootApis.getTopDonor
  );



  if (isLoading) return null;
  if (!donorsData?.data || donorsData?.data.length === 0) return null;
  if (error) return <div>{error}</div>;

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-xl font-bold font-primary">
          Top Donors
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey} className="font-primary">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(donorsData?.data) && (
              donorsData?.data.map((donor, index) => (
                <TableRow
                  key={donor._id}
                  className={index % 2 === 1 ? "bg-muted/50" : ""}
                >
                  {columns.map((column) => (
                    <column.cell
                      key={column.accessorKey}
                      row={{ original: donor }}
                    />
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
