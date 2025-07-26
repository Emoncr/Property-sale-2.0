"use client";
import PageHeading from "@/components/common/PageHeading";
import React, { useState } from "react";
import DonationDashboardMetrics from "../DashboardRoot/components/DonationDashboardMetrics";
import { DonationsTable } from "./components/DonationsTable";

const Donations = () => {
  const [pageHeading, setPageHeading] = useState("Donations");
  return (
    <div>
      <PageHeading pageName={pageHeading || "Donations"} />
      <div className="mt-5 ">
        <DonationDashboardMetrics />
      </div>
      <div className="mt-8 rounded-lg p-5 border border-border">
        <DonationsTable
          pageHeading={pageHeading}
          setPageHeading={setPageHeading}
        />
      </div>
    </div>
  );
};

export default Donations;
