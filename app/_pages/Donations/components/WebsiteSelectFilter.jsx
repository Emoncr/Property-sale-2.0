"use client";

import * as React from "react";
import useSWR from "swr";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/utils/apiMaker";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Loading from "@/components/ui/Loading";

export default function WebsiteSelectFilter({ setFilters, filters }) {
  const {
    data: websitesData,
    error,
    isLoading,
  } = useSWR(
    "/websites",
    fetchApi({
      endpoint: "/websites",
      path: "/",
      method: "GET",
    })
  );

  const websites = React.useMemo(
    () => websitesData?.data?.items || [],
    [websitesData]
  );

  if (isLoading) {
    return (
      <div className="flex items-start gap-2">
        <Loading loadingText="Loading websites..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled
          className="font-primary text-destructive"
        >
          <Globe className="size-4 mr-2" />
          Error loading websites
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-primary font-semibold">
          Filter by website
        </h4>
      </div>

      <div className="mt-2 space-y-3">
        {websites.length > 0 ? (
          <>
            {/* All option */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="website-filter-all"
                checked={filters.website === "all"}
                onCheckedChange={() =>
                  setFilters({ ...filters, website: "all" })
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="website-filter-all"
                className="text-sm font-primary cursor-pointer"
              >
                All Websites
              </Label>
            </div>

            {/* Individual website options */}
            {websites.map((website) => (
              <div key={website._id} className="flex items-center gap-2">
                <Checkbox
                  id={`website-filter-${website._id}`}
                  onCheckedChange={() =>
                    setFilters({ ...filters, website: website._id })
                  }
                  checked={filters.website === website._id}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={`website-filter-${website._id}`}
                  className="text-sm font-primary cursor-pointer flex-1"
                >
                  {website.name}
                </Label>
              </div>
            ))}
          </>
        ) : (
          <div className="text-sm text-muted-foreground font-primary">
            No websites available
          </div>
        )}
      </div>
    </div>
  );
}
