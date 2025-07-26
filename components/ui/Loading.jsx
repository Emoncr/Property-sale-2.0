import { Loader } from "lucide-react";
import React from "react";

const Loading = ({ loadingText = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4 font-primary">
      <div className="space-x-1 flex items-center gap-2">
        <Loader size={24} className="animate-spin text-primary " />
        <p className="text-sm md:text-base text-primary font-medium">
          {loadingText || "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Loading;
