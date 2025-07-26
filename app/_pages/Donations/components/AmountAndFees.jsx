import React from "react";

const AmountAndFees = ({ donationData, activeTab }) => {
  // Format currency values with proper symbol and decimals
  const formatCurrency = (value) => {
    return `${value?.toFixed(2) || "0.00"} ${donationData?.currency || "USD"} `;
  };

  return (
    <>
      {activeTab === "Amount & Fees" && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3">
              Transaction Breakdown
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Donation Amount",
                  value: formatCurrency(donationData?.amount),
                },
                {
                  label: "Processing Fee",
                  value: formatCurrency(donationData?.stripeFee),
                },
                {
                  label: "Platform Fee",
                  value: formatCurrency(donationData?.platformFee),
                },
                {
                  label: "Total Fees",
                  value: formatCurrency(donationData?.totalFees),
                },
                {
                  label: "Net Amount",
                  value: formatCurrency(donationData?.netAmount),
                },
                {
                  label: "Total Charged",
                  value: formatCurrency(donationData?.donorCharged),
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span
                    className={`font-medium ${
                      item.highlight ? "text-primary" : "text-gray-800"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AmountAndFees;
