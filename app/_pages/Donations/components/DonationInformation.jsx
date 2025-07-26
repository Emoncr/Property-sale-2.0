"use client";
import { Button } from "@/components/ui/button";
import { formatDateTimeUTC } from "@/lib/utils";
import {
  Check,
  Copy,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader,
} from "lucide-react";
import React, { useState } from "react";

const DonationInformation = ({ activeTab, donationData }) => {
  const [copied, setCopied] = useState(false);

  const statusConfig = {
    succeeded: {
      className:
        "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      icon: CheckCircle2,
      text: "Successful",
    },
    failed: {
      className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      icon: XCircle,
      text: "Failed",
    },
    cancelled: {
      className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      icon: XCircle,
      text: "Cancelled",
    },
    refunded: {
      className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      icon: RefreshCw,
      text: "Refunded",
    },
    initiated: {
      className:
        "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
      icon: Loader,
      text: "Initiated",
    },
  };

  const statusDisplay = statusConfig[donationData?.status] || {
    className: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
    icon: null,
    text: "Unknown",
  };

  const donationFields = [
    {
      label: "Transaction ID",
      value: donationData?.transactionId || "Not specified",
      isTransactionId: true,
    },
    {
      label: "Campaign",
      value: donationData?.campaign?.name || "Not specified",
    },
    {
      label: "Donation Type",
      value:
        donationData?.recurringInterval === "one-time"
          ? "One-time"
          : "Recurring",
    },
    {
      label: "Date & Time",
      value: formatDateTimeUTC(donationData?.createdAt),
    },
    {
      label: "Amount",
      value: `${donationData?.currency} ${
        donationData?.amount ? (donationData?.amount).toFixed(2) : "0.00"
      }`,
    },
    {
      label: "Payment Method",
      value: "Card", // You might want to get this from payment method details
    },
    {
      label: "Anonymous Donation",
      value: donationData?.isAnonymousDonation ? "Yes" : "No",
    },
    {
      label: "Status",
      value: statusDisplay.text,
      isStatus: true,
      statusDisplay: statusDisplay,
    },
    {
      label: "Processing Fees",
      value: `${donationData?.currency} ${Number(
        donationData?.totalFees
      ).toFixed(2)}`,
    },
    {
      label: "Net Amount",
      value: `${donationData?.currency} ${Number(
        donationData?.netAmount
      ).toFixed(2)}`,
    },
  ];

  const handleTransactionIdCopy = () => {
    navigator.clipboard.writeText(donationData?.transactionId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      {activeTab === "Donation Info" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {donationFields.map((field) => (
            <div key={field.label} className="space-y-1">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider font-primary">
                {field.label}
              </label>
              <div className="h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center justify-between text-sm text-gray-700 font-medium ">
                {field.isStatus ? (
                  <span
                    className={`px-2 py-1 ${field.statusDisplay.className} text-xs font-medium rounded font-primary border flex items-center gap-1`}
                  >
                    {field.statusDisplay.icon && (
                      <field.statusDisplay.icon className="w-3 h-3" />
                    )}
                    {field.value}
                  </span>
                ) : (
                  <span className="font-primary font-medium opacity-85 break-words">
                    {field.value}
                  </span>
                )}
                {field?.isTransactionId && (
                  <Button
                    onClick={handleTransactionIdCopy}
                    variant="ghost"
                    size="sm"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider font-primary">
              Donor Comment
            </label>
            <div className="h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center justify-between text-sm text-gray-700 font-medium mt-1 w-full ">
              {donationData?.campaign?.comment || "No comment provided"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationInformation;
