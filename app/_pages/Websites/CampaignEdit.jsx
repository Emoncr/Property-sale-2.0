"use client";
import CampaignEditForm from "@/app/_pages/Websites/CampaignDetails/CampaignEditForm";
import ContributorWall from "@/app/_pages/Websites/ContributorWall/ContributorWall";
import CustomForm from "@/app/_pages/Websites/CustomForm/CustomForm";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/utils/apiMaker";
import { ChevronLeft, Info } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import DonationFormLoading from "./CustomForm/components/DonationFormLoading";

const CampaignEdit = ({ campaignId, campaignData, contributorWallData }) => {
  const currentTab = useSearchParams().get("tab") || "details";

  const { data, isLoading, error } = useSWR(
    "custom-forms",
    fetchApi({
      endpoint: "/custom-forms",
      method: "GET",
      path: `/campaign/${campaignId}`,
    })
  );


  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Link
            href="/websites"
            className="flex items-center text-gray-700 hover:text-gray-900 font-medium text-base sm:text-xl leading-6 font-primary"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            <span>Back to Websites</span>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <Button className="bg-primary/80 text-white hover:bg-primary border-none flex gap-1 sm:gap-2 text-xs sm:text-sm py-2 px-3 sm:py-2 sm:px-4 h-auto">
            <Info className="h-3 w-3 sm:h-5 sm:w-5" />
            <span>Close Campaign</span>
          </Button>
          <Button className="bg-secondary text-white hover:bg-secondary/80 flex gap-1 sm:gap-2 text-xs sm:text-sm py-2 px-3 sm:py-2 sm:px-4 h-auto">
            <Info className="h-3 w-3 sm:h-5 sm:w-5" />
            <span>Request Pledges to Pay</span>
          </Button>
        </div>
      </div>
      {currentTab === "1" ? (
        <CampaignEditForm campaignData={campaignData} campaignId={campaignId} />
      ) : currentTab === "2" ? (
        <>
          {isLoading ? (
            <DonationFormLoading />
          ) : (
            <CustomForm
              customFormData={data?.data}
              isLoading={isLoading}
              error={error}
              campaignId={campaignId}
            />
          )}
        </>
      ) : currentTab === "3" ? (
        <ContributorWall
          contributorWallData={contributorWallData}
          campaignId={campaignId}
        />
      ) : (
        <CampaignEditForm campaignData={campaignData} campaignId={campaignId} />
      )}
    </div>
  );
};

export default CampaignEdit;
