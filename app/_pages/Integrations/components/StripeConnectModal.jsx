import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const StripeConnectModal = ({ data, onClose }) => {
  const [expandedFaqs, setExpandedFaqs] = useState({
    integration: false,
    disconnect: false,
  });

  const toggleFaq = (key) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="px-4">
      {/* Stripe Logo */}
      <div className="flex items-center mb-4 sm:mb-6">
        <div className="bg-indigo-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex justify-center items-center">
          <span className="text-white font-bold text-base sm:text-lg lg:text-xl">
            stripe
          </span>
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8 text-left">
        Securely Connect Your Stripe Account
      </h3>

      {/* Feature List */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-left">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3">
            <div className="text-primary border-2 border-primary rounded-full p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>
          <div>
            <span className="text-gray-900 font-bold text-sm sm:text-lg">
              100% Secure
            </span>
            <span className="text-gray-900 text-sm sm:text-lg">
              {" "}
              – Your funds stay in your Stripe account.
            </span>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3">
            <div className="text-primary border-2 border-primary rounded-full p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>
          <div>
            <span className="text-gray-900 font-bold text-sm sm:text-lg">
              Get Paid Instantly
            </span>
            <span className="text-gray-900 text-sm sm:text-lg">
              {" "}
              – Donations go directly to your Stripe balance.
            </span>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3">
            <div className="text-primary border-2 border-primary rounded-full p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>
          <div>
            <span className="text-gray-900 font-bold text-sm sm:text-lg">
              Standard Stripe Permissions
            </span>
            <span className="text-gray-900 text-sm sm:text-lg">
              {" "}
              – Needed to process payments & show donor info.
            </span>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-6 sm:mb-8">
        <div className="border-t border-gray-200 py-3 sm:py-4">
          <button
            className="w-full flex justify-between items-center text-left"
            onClick={() => toggleFaq("integration")}
          >
            <span className="text-gray-800 font-medium text-sm sm:text-lg">
              Why does SquareDonations need Stripe integration?
            </span>
            <FaAngleDown
              className={`w-4 h-4 sm:w-6 sm:h-6 text-gray-500 transform transition-transform ${
                expandedFaqs.integration ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedFaqs.integration && (
            <div className="mt-2 text-gray-600 text-left text-sm sm:text-base">
              SquareDonations uses Stripe to securely process payments and
              ensure your donations are received directly in your account,
              without any intermediaries.
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 py-3 sm:py-4">
          <button
            className="w-full flex justify-between items-center text-left"
            onClick={() => toggleFaq("disconnect")}
          >
            <span className="text-gray-800 font-medium text-sm sm:text-lg">
              Can I disconnect anytime?
            </span>
            <FaAngleDown
              className={`w-4 h-4 sm:w-6 sm:h-6 text-gray-500 transform transition-transform ${
                expandedFaqs.disconnect ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedFaqs.disconnect && (
            <div className="mt-2 text-gray-600 text-left text-sm sm:text-base">
              Yes, you can disconnect your Stripe account at any time through
              your SquareDonations dashboard. This will not affect your Stripe
              account or existing payments.
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 sm:py-3 px-4 border-2 border-primary text-primary font-semibold rounded-lg text-center text-sm sm:text-lg hover:bg-blue-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (data?.data?.url) {
              window.location.href = data?.data?.url;
            }
          }}
          className="flex-1 py-2.5 sm:py-3 px-4 bg-primary text-white font-semibold rounded-lg text-center text-sm sm:text-lg hover:bg-primary/90 transition-colors"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default StripeConnectModal;
