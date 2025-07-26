import { User } from "lucide-react";
import React from "react";

const DonorInformation = ({ donationData, setActiveTab, activeTab }) => {
  const donorInfoFields = [
    { label: "Email", value: donationData?.donor?.email },
    {
      label: "Phone",
      value: donationData?.donor?.phone || "Not provided",
    },
    {
      label: "Address",
      value: donationData?.donor?.address || "Not provided",
    },
    {
      label: "City",
      value: donationData?.donor?.city || "Not provided",
    },
    {
      label: "State",
      value: donationData?.donor?.state || "Not provided",
    },
    {
      label: "Postal Code",
      value: donationData?.donor?.postalCode || "Not provided",
    },
    {
      label: "Country",
      value: donationData?.donor?.country || "Not provided",
    },
    {
      label: "Donor Type",
      value:
        donationData?.donor?.type === "individual"
          ? "Individual"
          : "Organization",
    },
  ];
  return (
    <>
      {activeTab === "Donor Info" && (
        <div className="space-y-6">
          {/* Donor Profile */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                {donationData?.donor?.firstName} {donationData?.donor?.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                {donationData?.donor?.email || "No email provided"}
              </p>
            </div>
          </div>

          {/* Donor Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donorInfoFields.map((field) => (
              <div key={field.label} className="space-y-1">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {field.label}
                </label>
                <div className="h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center text-sm text-gray-700 font-medium">
                  <span
                    className={
                      !field.value || field.value === "Not provided"
                        ? "opacity-50"
                        : ""
                    }
                  >
                    {field.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DonorInformation;
