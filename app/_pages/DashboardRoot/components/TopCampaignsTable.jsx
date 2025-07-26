"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import useSWR from "swr";
import CampaignsTable from "@/components/skeleton/topCampaignSkeleton";
import dashboardRootApis from "../utils/apis";

// Format currency like $1,000
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

// Status badge for active/inactive
const getStatusBadge = (status) => (
  <Badge
    className={`font-primary ${status
        ? "bg-green-100 text-green-800 hover:bg-green-100"
        : "bg-orange-100 text-orange-800 hover:bg-orange-100"
      }`}
  >
    <div
      className={`w-2 h-2 rounded-full mr-2 ${status ? "bg-green-500" : "bg-orange-500"
        }`}
    />
    {status ? "Active" : "Inactive"}
  </Badge>
);

// Column definitions
const columns = [
  { header: "Name", render: (campaign) => campaign.name },
  { header: "Goal", render: (campaign) => formatCurrency(campaign.goal) },
  { header: "Raised", render: (campaign) => formatCurrency(campaign.amountRaised) },
  { header: "Status", render: (campaign) => getStatusBadge(campaign.isActive) },
];

export default function TopCampaignsTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: campaignsResponse, error, isLoading } = useSWR(
    dashboardRootApis.campaignCacheKey,
    dashboardRootApis.getTopCampaigns
  );

  const campaignsData = campaignsResponse?.data;

  const filteredCampaigns = useMemo(() => {
    if (!Array.isArray(campaignsData)) return [];

    if (!searchTerm.trim()) return campaignsData;

    return campaignsData.filter((campaign) =>
      campaign.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [campaignsData, searchTerm]);

  if (isLoading) return <CampaignsTable />;
  if (error) return <div className="text-red-500">Something went wrong.</div>;
  if (!filteredCampaigns.length) return <div></div>;

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-xl font-bold font-primary">
          Top Campaigns
        </CardTitle>

        {/* Search input (future usage) */}
        <div className="items-center justify-between gap-4 hidden">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-primary"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto px-4">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="border-b bg-muted/30 text-muted-foreground">
              {columns.map((column, i) => (
                <TableHead key={i} className="font-primary font-medium px-4 py-2 text-left">
                  {column.header}
                </TableHead>
              ))}
              <TableHead className="px-4 py-2" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow
                key={campaign._id}
                className="transition-colors hover:bg-muted/20"
              >
                {columns.map((column, i) => (
                  <TableCell key={i} className="px-4 py-3 font-primary text-foreground">
                    {column.render(campaign)}
                  </TableCell>
                ))}
                <TableCell className="px-4 py-3" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
