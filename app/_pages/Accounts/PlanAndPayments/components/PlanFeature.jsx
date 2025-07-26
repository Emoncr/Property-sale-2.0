import { Check, X } from "lucide-react";
import React from "react";

const PlanFeature = ({ children, included }) => {
  return (
    <li className="flex items-start gap-3">
      <div
        className={`flex items-center justify-center h-5 w-5 rounded-full mt-0.5 flex-shrink-0 ${
          included ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"
        }`}
      >
        {included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </div>
      <span className={included ? "text-gray-800" : "text-gray-500"}>
        {children}
      </span>
    </li>
  );
};

export default PlanFeature;
