import React from "react";

const DashboardRootLoading = () => {
  return (
    <div className="">
      <div className="p-6 pb-12 relative bg-white shadow-[0px_2px_12px_0px_#00000014] pt-8 rounded-[14px] z-0">
        <div className="mb-8">
          {/* Title and Description */}
          <div className="mb-6">
            <div className="animate-pulse bg-gray-200 h-8 w-80 rounded mb-3"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-64 rounded"></div>
          </div>

          {/* Progress Indicator */}
          <div className="animate-pulse bg-gray-200 h-4 w-32 rounded mb-6"></div>

          {/* Launch Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Steps */}
            <div className="space-y-7">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-[0px_2px_12px_0px_#00000014] border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="animate-pulse bg-gray-200 w-6 h-6 rounded-full"></div>
                    <div className="animate-pulse bg-gray-200 h-5 w-40 rounded"></div>
                  </div>
                  <div className="animate-pulse bg-gray-200 w-6 h-6 rounded"></div>
                </div>
              ))}
            </div>

            {/* Right Column - Video */}
            <div className="bg-white rounded-lg p-4 shadow-[0px_2px_12px_0px_#00000014]">
              <div className="aspect-video bg-gray-200 rounded-lg animate-pulse relative">
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse bg-red-200 w-16 h-12 rounded-lg"></div>
                </div>
                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="animate-pulse bg-gray-300 h-2 rounded mb-2"></div>
                  <div className="flex justify-between">
                    <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                    <div className="animate-pulse bg-gray-300 h-4 w-16 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-10">
        {/* Raised Card */}
        <div className="bg-white rounded-lg p-6 shadow-[0px_2px_12px_0px_#00000014] ">
          <div className="flex justify-between items-start mb-4">
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
          </div>
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded mb-2"></div>
        </div>

        {/* Active Subscribers Card */}
        <div className="bg-white rounded-lg p-6 shadow-[0px_2px_12px_0px_#00000014]">
          <div className="flex justify-between items-start mb-4">
            <div className="animate-pulse bg-gray-200 h-4 w-28 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
          </div>
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
        </div>

        {/* Donations Card */}
        <div className="bg-white rounded-lg p-6 shadow-[0px_2px_12px_0px_#00000014]">
          <div className="flex justify-between items-start mb-4">
            <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
          </div>
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg p-6 shadow-[0px_2px_12px_0px_#00000014]">
        {/* Chart Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="animate-pulse bg-gray-200 h-6 w-32 rounded mb-2"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
          </div>

          {/* Time Period Buttons */}
          <div className="flex gap-2">
            {["7 Days", "30 Days", "6 Months", "12 Months"].map(
              (period, index) => (
                <div
                  key={index}
                  className={`animate-pulse h-9 rounded px-4 ${
                    index === 3 ? "bg-blue-200 w-20" : "bg-gray-200 w-16"
                  }`}
                ></div>
              )
            )}
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative">
          {/* Chart Bars */}
          <div className="flex items-end justify-between gap-2 h-64 mb-4">
            {Array.from({ length: 15 }, (_, index) => {
              // Generate random heights for variety
              const heights = [
                "h-24",
                "h-40",
                "h-16",
                "h-32",
                "h-36",
                "h-20",
                "h-28",
                "h-48",
                "h-20",
                "h-24",
                "h-44",
                "h-52",
                "h-16",
                "h-12",
                "h-40",
              ];
              return (
                <div
                  key={index}
                  className={`animate-pulse bg-blue-200 w-8 rounded-t ${heights[index]} flex-shrink-0`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: "1.5s",
                  }}
                ></div>
              );
            })}
          </div>

          {/* Chart Labels */}
          <div className="flex justify-between gap-2">
            {Array.from({ length: 15 }, (_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 h-3 w-8 rounded flex-shrink-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "1.5s",
                }}
              ></div>
            ))}
          </div>

          {/* Peak Value Indicator */}
          <div className="absolute top-8 left-20">
            <div className="animate-pulse bg-gray-200 h-3 w-16 rounded mb-1"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
          </div>
        </div>
      </div>

      {/* Chat Button Skeleton */}
      <div className="fixed bottom-6 right-6">
        <div className="animate-pulse bg-blue-200 w-12 h-12 rounded-full"></div>
      </div>
    </div>
  );
};

export default DashboardRootLoading;
