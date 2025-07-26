import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

const PopupKeyCopyButton = ({ popupKey }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(popupKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-1 mt-4">
      <p className="text-base font-medium mb-2 text-[#1C1C1C]">Popup key</p>
      <div className="flex">
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-l-md py-2 px-3 truncate">
          <span className="text-gray-900 text-sm">
            {popupKey || "No Popup Key Found"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!popupKey}
          className={`flex items-center gap-1 px-3 py-2 text-sm rounded-r-md transition-colors font-primary ${
            copied ? "bg-green-600 text-white" : "bg-blue-600  text-white"
          } ${
            !popupKey ? "bg-gray-300 hover:!bg-gray-300 cursor-not-allowed" : ""
          }`}
        >
          {copied ? (
            "Copied!"
          ) : (
            <>
              <MdContentCopy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PopupKeyCopyButton;
