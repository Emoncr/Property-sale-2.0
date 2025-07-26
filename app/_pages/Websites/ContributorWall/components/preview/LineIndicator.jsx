import React from "react";

const LineIndicator = ({
  fundraisingData,
  primaryColor,
  secondaryColor,
}) => {
  return (
    <>
      <div
        className="w-full h-4  rounded-full mb-2"
        style={{ backgroundColor: secondaryColor }}
      >
        <div
          className="h-full font-primary rounded-full"
          style={{
            backgroundColor: primaryColor,
            width: `${fundraisingData.percentFunded}%`,
          }}
        />
        <div className="text-right text-xs mt-1 font-primary">
          {fundraisingData.percentFunded}% Funded
        </div>
      </div>
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
    </>
  );
};

export default LineIndicator;
