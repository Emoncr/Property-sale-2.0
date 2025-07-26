"use client";
import React from "react";
import TutorialSection from "./components/TutorialSection";
import DonationDashboardMetrics from "./components/DonationDashboardMetrics";
import PageHeading from "@/components/common/PageHeading";
import { DonationReportChart } from "./components/DonationReportChart";
import useSWR from "swr";
import { fetchApi } from "@/utils/apiMaker";
import DashboardRootLoading from "./components/DashboardRootLoading";
// import EmailVerificationBanner from "./components/EmailVerificationBanner";
import useUserStore from "@/store/userStore";
import TotalRaisedChart from "./components/TotalRaisedChart";
import TopCampaignsTable from "./components/TopCampaignsTable";
import TopDonorsTable from "./components/TopDonorsTable";

const DashboardRoot = () => {
  const { user } = useUserStore((state) => state);
  const { data, isLoading, error } = useSWR(
    "/donations",
    fetchApi({
      endpoint: "/donations",
      path: "/organizer/metrics",
      method: "GET",
    })
  );

  return (
    <>
      {isLoading ? (
        <DashboardRootLoading />
      ) : (
        <>
          <div>
            {/* {!user?.user?.isEmailVerified && <EmailVerificationBanner />} */}
            <TutorialSection user={user} />
 
            <div className="mt-16">
              <PageHeading pageName="Dashboard" />
            </div>

            <div className="mt-5">
              <DonationDashboardMetrics metricsData={data?.data?.metrics} />
              {/* <DonationReportChart donationReportData={data?.data?.charts} /> */}
              <div className="mt-8">
                <TotalRaisedChart donationReportData={data?.data?.charts} />
              </div>
              <div className="mt-8">
                <TopCampaignsTable />
              </div>

              <div className="mt-8">
                <TopDonorsTable />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardRoot;
