import React from "react";

const DonationDashboardMetrics = ({ metricsData }) => {
  // Simple Sparkling component using SVG


  const Sparkling = ({ data, color = "#ef4444" }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg
        className="w-16 h-6"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
      </svg>
    );
  };

  const SparklingData = [20, 35, 25, 45, 30, 55, 40, 60, 45, 50];

  return (
    <div>
      {/* Main Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Raised Amount */}
        <div className="bg-white rounded-2xl p-6  shadow-md border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#333] text-sm font-medium mb-1 font-primary">
                Raised
              </p>
              <h2 className="text-4xl font-bold text-[#073159] mt-5 font-primary">
                ${metricsData?.amountRaised || 0}
              </h2>
            </div>
            <div className="flex items-center">
              <Sparkling data={SparklingData} color="#ef4444" />
            </div>
          </div>
        </div>

        {/* Active Subscribers */}
        <div className="bg-white rounded-2xl p-6  shadow-md border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#333] text-sm font-medium mb-1  font-primary">
                Active Subscribers
              </p>
              <h2 className="text-4xl font-bold text-[#073159]  mt-5 font-primary">
                {metricsData?.activeSubscribers || 0}
              </h2>
            </div>
            <div className="flex items-center">
              <Sparkling
                data={[30, 25, 35, 20, 40, 35, 45, 30, 50, 40]}
                color="#ef4444"
              />
            </div>
          </div>
        </div>
        {/* Donations */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#333] text-sm font-medium mb-1 font-primary">
                Donations
              </p>
              <h2 className="text-4xl font-bold text-[#073159] mt-5 font-primary">
                {metricsData?.totalDonations || 0}
              </h2>
            </div>
            <div className="flex items-center">
              <Sparkling
                data={[30, 25, 35, 20, 40, 35, 45, 30, 50, 40]}
                color="#ef4444"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDashboardMetrics;
