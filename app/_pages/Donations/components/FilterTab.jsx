import React from "react";
import { CalendarIcon, DollarSign, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import WebsiteSelectFilter from "./WebsiteSelectFilter";
import CampaignSelectFilter from "./CampaignSelectFilter";
import AmountRangeFilter from "./AmountRangeFilter";

const FilterTab = ({ setFilters, filters }) => {
  const resetFilters = () => {
    setFilters({
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
  };

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "succeeded", label: "Succeeded" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "refunded", label: "Refunded" },
    { value: "initiated", label: "Initiated" },
  ];

  const currencyOptions = [
    { value: "all", label: "All Currencies" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "CAD", label: "CAD" },
    { value: "AUD", label: "AUD" },
  ];

  const donationTypeOptions = [
    { value: "all", label: "All Types" },
    { value: "one-time", label: "One Time" },
    { value: "recurring", label: "Recurring" },
  ];

  const recurringIntervalOptions = [
    { value: "all", label: "All Intervals" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
  ];

  const donorTypeOptions = [
    { value: "all", label: "All Donor Types" },
    { value: "individual", label: "Individual" },
    { value: "organization", label: "Organization" },
    { value: "company", label: "Company" },
  ];

  const countryOptions = [
    { value: "all", label: "All Countries" },
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "GB", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "IN", label: "India" },
    { value: "BD", label: "Bangladesh" },
  ];

  return (
    <div className="space-y-6 ">
      {/* Reset Filters Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold font-primary">Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="font-primary"
        >
          <RotateCcw className="size-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Website Filter */}
      <div>
        <WebsiteSelectFilter setFilters={setFilters} filters={filters} />
      </div>

      <Separator />

      {/* Campaign Filter */}
      <div>
        <CampaignSelectFilter setFilters={setFilters} filters={filters} />
      </div>

      <Separator />

      {/* Status Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-primary font-semibold">Status</Label>
        <Select
          value={filters.status || "all"}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger className="font-primary">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="font-primary">
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Amount Range Filter */}
      <AmountRangeFilter filters={filters} setFilters={setFilters} />
      <Separator />

      {/* Currency Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-primary font-semibold">Currency</Label>
        <Select
          value={filters.currency || "all"}
          onValueChange={(value) => setFilters({ ...filters, currency: value })}
        >
          <SelectTrigger className="font-primary">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent className="font-primary">
            {currencyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Date Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-primary font-semibold flex items-center gap-2">
          <CalendarIcon className="size-4" />
          Date Range
        </Label>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <Label
              htmlFor="startDate"
              className="text-xs font-primary text-muted-foreground"
            >
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={filters.startDate || ""}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="font-primary"
            />
          </div>
          <div>
            <Label
              htmlFor="endDate"
              className="text-xs font-primary text-muted-foreground"
            >
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={filters.endDate || ""}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="font-primary"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Donation Type Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-primary font-semibold">
          Donation Type
        </Label>
        <Select
          value={filters.donationType || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, donationType: value })
          }
        >
          <SelectTrigger className="font-primary">
            <SelectValue placeholder="Select donation type" />
          </SelectTrigger>
          <SelectContent className="font-primary">
            {donationTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Recurring Interval Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-primary font-semibold">
          Recurring Interval
        </Label>
        <Select
          value={filters.recurringInterval || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, recurringInterval: value })
          }
        >
          <SelectTrigger className="font-primary">
            <SelectValue placeholder="Select interval" />
          </SelectTrigger>
          <SelectContent className="font-primary">
            {recurringIntervalOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Donor Type Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-primary font-semibold">Donor Type</Label>
        <Select
          value={filters.donorType || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, donorType: value })
          }
        >
          <SelectTrigger className="font-primary">
            <SelectValue placeholder="Select donor type" />
          </SelectTrigger>
          <SelectContent className="font-primary">
            {donorTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Country Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-primary font-semibold">Country</Label>
        <Select
          value={filters.country || "all"}
          onValueChange={(value) => setFilters({ ...filters, country: value })}
        >
          <SelectTrigger className="font-primary">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent className="font-primary">
            {countryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Boolean Filters */}
      <div className="space-y-4">
        <Label className="text-sm font-primary font-semibold">
          Additional Filters
        </Label>

        {/* Refunded Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-primary text-muted-foreground">
            Refund Status
          </Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="refunded-all"
                checked={filters.isRefunded === "all"}
                onCheckedChange={() =>
                  setFilters({ ...filters, isRefunded: "all" })
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="refunded-all"
                className="text-sm font-primary cursor-pointer"
              >
                All
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="refunded-true"
                checked={filters.isRefunded === "true"}
                onCheckedChange={() =>
                  setFilters({ ...filters, isRefunded: "true" })
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="refunded-true"
                className="text-sm font-primary cursor-pointer"
              >
                Refunded Only
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="refunded-false"
                checked={filters.isRefunded === "false"}
                onCheckedChange={() =>
                  setFilters({ ...filters, isRefunded: "false" })
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="refunded-false"
                className="text-sm font-primary cursor-pointer"
              >
                Non-Refunded Only
              </Label>
            </div>
          </div>
        </div>

        {/* Anonymous Donation Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-primary text-muted-foreground">
            Anonymous Status
          </Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="anonymous-all"
                checked={filters.isAnonymousDonation === "all"}
                onCheckedChange={() =>
                  setFilters({ ...filters, isAnonymousDonation: "all" })
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="anonymous-all"
                className="text-sm font-primary cursor-pointer"
              >
                All
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="anonymous-true"
                checked={filters.isAnonymousDonation === "true"}
                onCheckedChange={() =>
                  setFilters({ ...filters, isAnonymousDonation: "true" })
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="anonymous-true"
                className="text-sm font-primary cursor-pointer"
              >
                Anonymous Only
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="anonymous-false"
                checked={filters.isAnonymousDonation === "false"}
                onCheckedChange={() =>
                  setFilters({ ...filters, isAnonymousDonation: "false" })
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="anonymous-false"
                className="text-sm font-primary cursor-pointer"
              >
                Named Only
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTab;
