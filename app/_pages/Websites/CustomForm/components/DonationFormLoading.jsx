import React from "react";

const SkeletonLoader = ({
  className = "",
  width = "100%",
  height = "20px",
}) => (
  <div
    className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded ${className}`}
    style={{ width, height }}
  />
);

const ToggleSkeleton = () => (
  <div className="flex items-center justify-between">
    <SkeletonLoader width="140px" height="16px" />
    <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse" />
  </div>
);

const DonationFormLoading = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 pb-10 md:px-6 lg:px-8 pt-8 px-3 bg-white">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Configuration */}
        <div className="px-3">
          {/* Configure Section Header */}
          <div className="mb-6">
            <SkeletonLoader width="100px" height="24px" className="mb-4" />
            <div className="relative">
              <SkeletonLoader
                width="100%"
                height="48px"
                className="rounded-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <SkeletonLoader width="16px" height="16px" />
              </div>
            </div>
          </div>

          {/* Contribution Options Section */}
          <div className="space-y-6">
            {/* Section Title */}
            <div className="flex items-center space-x-2">
              <SkeletonLoader width="160px" height="18px" />
              <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
            </div>

            {/* Contribution Amount Options */}
            <div className="flex space-x-4">
              <SkeletonLoader
                width="60px"
                height="40px"
                className="rounded-lg"
              />
              <SkeletonLoader
                width="60px"
                height="40px"
                className="rounded-lg"
              />
              <SkeletonLoader
                width="60px"
                height="40px"
                className="rounded-lg"
              />
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-6">
              <ToggleSkeleton />

              <div>
                <SkeletonLoader width="120px" height="16px" className="mb-3" />
                <SkeletonLoader
                  width="100%"
                  height="40px"
                  className="rounded-lg"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <SkeletonLoader width="140px" height="16px" />
                  <div className="w-1 h-4 bg-red-300 rounded animate-pulse" />
                </div>
                <SkeletonLoader
                  width="100%"
                  height="40px"
                  className="rounded-lg"
                />
              </div>

              <ToggleSkeleton />
              <ToggleSkeleton />
              <ToggleSkeleton />
              <ToggleSkeleton />
              <ToggleSkeleton />
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="border border-gray-200 p-5 rounded-xl">
          {/* Preview Header */}
          <div className="text-center mb-6">
            <SkeletonLoader
              width="180px"
              height="24px"
              className="mx-auto mb-4"
            />

            {/* Step Indicators */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-8 h-8 bg-blue-200 rounded-full animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Donation Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <div className="flex-1 bg-blue-200 rounded-md py-2 animate-pulse">
              <SkeletonLoader width="80px" height="16px" className="mx-auto" />
            </div>
            <div className="flex-1 py-2">
              <SkeletonLoader width="60px" height="16px" className="mx-auto" />
            </div>
          </div>

          {/* Amount Selection */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <SkeletonLoader height="48px" className="rounded-lg" />
            <SkeletonLoader height="48px" className="rounded-lg" />
            <SkeletonLoader height="48px" className="rounded-lg" />
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <SkeletonLoader width="160px" height="16px" className="mb-3" />
            <div className="relative">
              <SkeletonLoader height="48px" className="rounded-lg" />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <SkeletonLoader width="30px" height="16px" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <SkeletonLoader height="40px" className="rounded-lg" />
            <SkeletonLoader height="48px" className="rounded-lg bg-blue-200" />
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <SkeletonLoader width="80px" height="40px" className="rounded-lg" />
        <div className="flex space-x-3">
          <SkeletonLoader width="100px" height="40px" className="rounded-lg" />
          <SkeletonLoader
            width="140px"
            height="40px"
            className="rounded-lg bg-pink-200"
          />
        </div>
      </div>
    </div>
  );
};

export default DonationFormLoading;
