import React from "react";

const CircularIndicator = ({
  primaryColor,
  secondaryColor,
  textColor,
  totalDonations,
  targetDonation,
  fundraisingData,
}) => {
  // Calculate the percentage of donations
  const percentage = (totalDonations / targetDonation) * 100;
  const clampedPercentage = Math.min(percentage, 100); // Ensure percentage does not exceed 100

  return (
    <>
      <div className="relative w-[100%]  flex items-center justify-center">
        <div
          className="w-28 md:w-28 h-28 md:h-28 rounded-full"
          style={{
            background: `conic-gradient(${primaryColor} 0% ${clampedPercentage}%, ${secondaryColor} ${clampedPercentage}% 100%)`,
          }}
        ></div>
        <div
          className="h-full mt-0 md:mt-8 mb-14 md:mb-0 align-top"
          style={{ color: textColor }}
        >
          <p className="text-[10px] font-bold">
            {clampedPercentage.toFixed(1)}% Funded
          </p>
        </div>
        <div>
          {/* Amount Raised */}
          <div className="mb-4 mt-6 bg-[#FBFBFB] rounded-lg p-2 px-4">
            <div className="text-sm font-medium font-primary">
              Raised of ${fundraisingData.goal}
            </div>
            <div className="text-base font-medium text-black font-primary">
              ${fundraisingData.raised}
            </div>
          </div>
          {/* Supporters */}
          <div className="mb-4 mt-4 bg-[#FBFBFB] rounded-lg p-2 px-4">
            <div className="text-sm font-medium font-primary">Supporters</div>
            <div className="text-base font-medium text-black font-primary">
              {fundraisingData.supporters}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CircularIndicator;
