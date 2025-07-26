"use client";
import PageHeading from "@/components/common/PageHeading";
import React from "react";
import { DonorSubscriptionsTable } from "./components/DonorSubscriptionsTable";


const DonorDashboard = () => {
  return (
    <div>
      <PageHeading pageName="Subscriptions" />
      <div className="mt-5">
        <p className="text-sm font-primary text-slate-500">
          {"Manage your subscriptions and billing preferences."}
        </p>
      </div>

      <div className="mt-4">
        <DonorSubscriptionsTable />
      </div>
    </div>
  );
};

export default DonorDashboard;
