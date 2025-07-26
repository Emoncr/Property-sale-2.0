import React, { useState } from "react";
import {
  Info,
  User,
  DollarSign,
  Link,
  RefreshCw,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DonationInformation from "./DonationInformation";
import DonorInformation from "./DonorInformation";
import AmountAndFees from "./AmountAndFees";
import IntegrationsPreview from "./IntegrationsPreview";
import { base_url } from "@/utils/apiMaker";
import donationApis from "../utils/donationApis";
import { mutate } from "swr";
import ConfirmationAlert from "@/components/common/ConfirmationAlert";
import { useRouter } from "next/navigation";

export default function DonationPreview({
  donationData,
  onClose,
  setPreviewDonation,
}) {
  const [activeTab, setActiveTab] = useState("Donation Info");

  const [downloading, setDownloading] = useState(false);

  const tabs = [
    { name: "Donation Info", icon: <Info className="w-4 h-4" /> },
    { name: "Donor Info", icon: <User className="w-4 h-4" /> },
    { name: "Amount & Fees", icon: <DollarSign className="w-4 h-4" /> },
    { name: "Integrations", icon: <Link className="w-4 h-4" /> },
  ];

  const handleDownload = async (id) => {
    setDownloading(true);
    try {
      const response = await fetch(
        `${base_url}/invoices/download?donationId=${id}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "donation.pdf";
      link.click();
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="font-primary">
      <div>
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <div className="flex px-4 gap-2 min-w-full md:min-w-0 md:px-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3 py-3 text-sm font-medium transition-all duration-200 relative flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.name
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {/* Show only icon on small screens */}
                <span className="md:hidden">{tab.icon}</span>
                {/* Show both icon and text on larger screens */}
                <span className="hidden md:flex items-center gap-2">
                  {tab.icon}
                  {tab.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <DonationInformation
            activeTab={activeTab}
            donationData={donationData}
          />
          <DonorInformation activeTab={activeTab} donationData={donationData} />
          <AmountAndFees activeTab={activeTab} donationData={donationData} />
          <IntegrationsPreview
            activeTab={activeTab}
            donationData={donationData}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex-col lg:flex-row flex gap-3 p-6 border-t border-gray-100 bg-gray-50">
        <ConfirmationAlert
          id={donationData?._id}
          title={`Are you sure you want to refund ${donationData?.name}?`}
          description={`You can undo this action later. This action will refund ${donationData?.amount} ${donationData?.currency} to ${donationData?.donor?.firstName} ${donationData?.donor?.lastName}.`}
          cacheKey={donationApis.cacheKey}
          requestEndpoint={donationApis.updateRefund(donationData?._id)}
          handleDone={async (data) => {
            const updatedDonation = data?.data;
            if (updatedDonation) {
              await mutate(donationApis.cacheKey, (prev) => {
                if (!prev?.data || !Array.isArray(prev.data)) return prev;

                const updatedDonation = data?.data;
                return {
                  ...prev,
                  data: prev.data.map((donation) =>
                    donation._id === updatedDonation._id
                      ? { ...donation, status: updatedDonation.status }
                      : donation
                  ),
                };
              });
              if (setPreviewDonation) {
                setPreviewDonation(updatedDonation);
              }
            }
          }}
          disabled={donationData?.status !== "succeeded"}
        >
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            disabled={donationData?.status !== "succeeded"}
          >
            <RefreshCw className="w-4 h-4" />
            Refund
          </Button>
        </ConfirmationAlert>

        <Button
          size="lg"
          className="w-full"
          onClick={() => handleDownload(donationData._id)}
          disabled={downloading}
        >
          <Download className="w-4 h-4" />
          {downloading ? "Downloading..." : "Download Receipt"}
        </Button>

        <Button
          onClick={onClose}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          Close Preview
        </Button>
      </div>
    </div>
  );
}
