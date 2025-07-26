"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ContributionConfirmationForm from "./components/ContributionConfirmationForm";
import useSWR from "swr";
import { fetchApi } from "@/utils/apiMaker";
import Loading from "@/components/ui/Loading";
import ErrorComponent from "@/components/common/ErrorComponent";
import NotificationCardSkeleton from "../components/NotificationCardSkeleton";
import notificationApis from "../utils/notificationApis";

const ContributionConfirmation = () => {
  const { data, error, isLoading } = useSWR(
    notificationApis.cacheKeyforContributionConfirmation,
    notificationApis.getContributionNotificationsTemplate
  );

  // Enhanced error handling
  if (error) {
    return (
      <div className="mt-5">
        <ErrorComponent
          title="Failed to Load Notification Templates"
          message="We couldn't load the notification templates. Please check your connection and try again."
          onRetry={() => mutate()} // Use SWR's mutate to retry
          showHomeButton={true}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* Back Button */}
        <div>
          <Link href={"/notifications"}>
            <Button variant="ghost" className="">
              <ChevronLeft size={16} />
              Contribution Confirmation
            </Button>
          </Link>
        </div>
        <div className="mt-5">
          {isLoading ? (
            <>
              {/* <Loading loadingText="Loading..." /> */}
              <NotificationCardSkeleton />
            </>
          ) : (
            <>
              <ContributionConfirmationForm
                key={data?.data?.id}
                notificationsData={data?.data || {}}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContributionConfirmation;
