"use client";
import { useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";

const PopupScriptComponent = ({ popupKey, campaignId, isPopupActive }) => {
  const [showMessage, setShowMessage] = useState(false);
  const textareaRef = useRef(null);

  const copyToClipboard = () => {
    if (textareaRef.current) {
      navigator.clipboard
        .writeText(textareaRef.current.value)
        .then(() => {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const popupPaymentFormScript = `<div id="payment-form-popup" isPopupActive="true" popupKey="${popupKey}"><div id="donation-form-popup-overlay"><div id="donation-form-popup"><div style="display: none" id="close-button-container"><button class="close-button" aria-label="Close popup">&times;</button></div><div class="iframe-container"><iframe src="https://staging.squaredonations.com/form.html?campaignId=${campaignId}"style="width: 100%; height: 100%; margin: 0 auto; border: none"></iframe></div></div></div></div><script src="https://staging.squaredonations.com/popupScript.js"></script>`;

  return (
    <div className={`space-y-3 ${!isPopupActive ? "opacity-50" : ""}`}>
      <div className="relative">
        <textarea
          ref={textareaRef}
          className={`w-full p-3 text-sm font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
            !isPopupActive ? "cursor-not-allowed" : ""
          }`}
          rows={4}
          defaultValue={popupPaymentFormScript}
          disabled={!isPopupActive}
          readOnly
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={!isPopupActive}
          type="button"
          onClick={copyToClipboard}
          className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            showMessage
              ? "bg-green-600 text-white shadow-sm" // Green when copied
              : isPopupActive
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              : "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
        >
          {showMessage ? (
            "Copied!"
          ) : (
            <>
              <MdContentCopy className="w-4 h-4" />
              <span>Copy Script</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PopupScriptComponent;
