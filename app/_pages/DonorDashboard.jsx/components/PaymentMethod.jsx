import { Dot } from "lucide-react";
import React from "react";

const PaymentMethod = () => {
  return (
    <>
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Method
        </h3>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-4">
          <div className="w-10 h-6 bg-gray-200 rounded mr-3 flex items-center justify-center">
            <svg className="w-6 h-4" viewBox="0 0 24 16" fill="none">
              <rect width="24" height="16" rx="2" fill="#1A1A1A" />
              <rect x="16" y="6" width="6" height="4" rx="1" fill="#FF5F00" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-medium">Mastercard ending in 0341</p>
            <p className="text-sm text-gray-500">Expires 12/25</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-1 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none  ">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Change
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">
              Billing Address
            </p>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">123 Main St</p>
              <p className="text-gray-600">San Francisco, CA 94107</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
