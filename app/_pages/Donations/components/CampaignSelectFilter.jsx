"use client";

import * as React from "react";
import useSWR from "swr";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/utils/apiMaker";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Loading from "@/components/ui/Loading";

export default function CampaignSelectFilter({ setFilters, filters }) {
  const {
    data: campaignsData,
    error,
    isLoading,
  } = useSWR(
    "/campaigns",
    fetchApi({
      endpoint: "/campaigns",
      path: "/",
      method: "GET",
    })
  );

  const campaigns = React.useMemo(
    () => campaignsData?.data?.items || [],
    [campaignsData]
  );

  if (isLoading) {
    return (
      <div className="flex items-start gap-2">
        <Loading loadingText="Loading campaigns..." />
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
          Error loading campaigns
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-primary font-semibold">
          Filter by Campaigns
        </h4>
      </div>

      <div className="mt-2 space-y-3">
        {campaigns.length > 0 ? (
          <>
            {/* All option */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="website-filter-all"
                checked={filters.campaign === "all"}
                onCheckedChange={() =>
                  setFilters({ ...filters, campaign: "all" })
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="website-filter-all"
                className="text-sm font-primary cursor-pointer"
              >
                All campaigns
              </Label>
            </div>

            {/* Individual website options */}
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="flex items-center gap-2">
                <Checkbox
                  id={`campaign-filter-${campaign._id}`}
                  onCheckedChange={() =>
                    setFilters({ ...filters, campaign: campaign._id })
                  }
                  checked={filters.campaign === campaign._id}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={`campaigns-filter-${campaign._id}`}
                  className="text-sm font-primary cursor-pointer flex-1"
                >
                  {campaign.name}
                </Label>
              </div>
            ))}
          </>
        ) : (
          <div className="text-sm text-muted-foreground font-primary">
            No campaigns available
          </div>
        )}
      </div>
    </div>
  );
}
