import React from "react";

const SidebarLoading = () => {
  return (
    <div className="mt-8">
      <div className="p-4 space-y-2">
        {/* Dashboard */}
        <div className="flex items-center space-x-3 p-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 "></div>
        </div>

        {/* Websites */}
        <div className="flex items-center space-x-3 p-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 "></div>
        </div>

        {/* Campaigns */}
        <div className="flex items-center space-x-3 p-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 "></div>
        </div>

        {/* Donations */}
        <div className="flex items-center justify-between p-3 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          </div>
          <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Integrations */}
        <div className="flex items-center space-x-3 p-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
        </div>

        {/* Notifications */}
        <div className="flex items-center space-x-3 p-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 "></div>
        </div>

        {/* API Resources */}
        <div className="flex items-center space-x-3 p-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 "></div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-4"></div>

        {/* Accounts */}
        <div className="flex items-center space-x-3 p-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 "></div>
        </div>

        {/* Tutorials */}
        <div className="flex items-center space-x-3 p-3 rounded-lg">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLoading;
