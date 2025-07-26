"use client";

import React, { useState } from "react";
import PaymentMethod from "./PaymentMethod";

const AccountInfo = () => {
  // Fake donation data
  const donationData = {
    transactionId: "txn_5HjP8LmK9bQvE2wX",
    campaign: {
      name: "Save the Rainforest",
      comment: "Thank you for supporting environmental conservation!",
    },
    recurringInterval: "one-time",
    createdAt: "2023-11-15T14:30:00Z",
    currency: "USD",
    amount: 150.0,
    status: "succeeded",
    totalFees: 4.5,
    netAmount: 145.5,
    isAnonymousDonation: false,
  };

  const donationFields = [
    {
      label: "Name",
      value: donationData?.transactionId || "Not specified",
    },
    {
      label: "Email",
      value: donationData?.campaign?.name || "Not specified",
    },
    {
      label: "Address",
      value:
        donationData?.recurringInterval === "one-time"
          ? "One-time"
          : "Recurring",
    },
  ];

  return (
    <div className="pb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 font-primary">
        Account Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {donationFields.map((field) => (
          <div key={field.label} className="space-y-1">
            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider font-primary">
              {field.label}
            </label>
            <div
              className={`h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center justify-between text-sm `}
            >
              <span className="truncate font-primary">{field.value}</span>
            </div>
          </div>
        ))}
      </div>

      <PaymentMethod />
    </div>
  );
};

export default AccountInfo;
