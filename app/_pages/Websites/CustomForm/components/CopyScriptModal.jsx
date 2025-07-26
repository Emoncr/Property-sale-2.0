"use client";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import React from "react";

const CopyScriptModal = ({ campaignId }) => {
  const [isCopy, setIsCopy] = React.useState(false);

  const paymentFormScript = `<div id="donation-form" data-campaign-id=${campaignId} class="donation-form-id-container"><div class="iframe-container" style="height: 520px !important"><iframe src="https://staging.squaredonations.com/form.html?campaignId=${campaignId}" style="width: 100%; height: 100%; margin: 0 auto; border: none; z-index: 99999999;"></iframe></div></div><script src="https://staging.squaredonations.com/paymentForm.js"></script>`;

  const handleCopyScript = () => {
    if (!isCopy) {
      navigator.clipboard.writeText(paymentFormScript);
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 5000);
    }
  };
  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-100">
        <pre className="whitespace-pre-wrap ">
          <code className="text-sm text-gray-700">{paymentFormScript}</code>
        </pre>
      </div>
      <div className="mt-2 flex justify-center">
        <Button
          className={`font-normal text-xs ${
            isCopy ? "bg-green-600 hover:bg-green-600" : "bg-primary"
          }`}
          onClick={() => handleCopyScript()}
        >
          {isCopy ? (
            <CopyCheck className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {isCopy ? "Copied!" : "Copy Script"}
        </Button>
      </div>
    </>
  );
};

export default CopyScriptModal;
