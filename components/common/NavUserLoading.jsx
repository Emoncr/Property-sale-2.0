import React from "react";
import { MoreVertical } from "lucide-react";

export function NavUserLoading() {
  return (
    <div className="w-full">
      <div className="flex items-center space-x-3 p-2 rounded-lg">
        {/* Avatar skeleton */}
        <div className="h-8 w-8 rounded-lg bg-gray-200 animate-pulse"></div>

        {/* Text content skeleton */}
        <div className="flex-1 space-y-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>

        {/* More icon skeleton */}
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
