"use client";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import React from "react";

const ContributorWallScript = ({ campaignId }) => {
  const [isCopy, setIsCopy] = React.useState(false);

  const contributorWallScript = `<div id='square-donations-content-${campaignId}'></div><script src='https://staging.squaredonations.com/square-donations-plugin.js' api-key=${campaignId}></script>`;

  const handleCopyScript = () => {
    if (!isCopy) {
      navigator.clipboard.writeText(contributorWallScript);
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
          <code className="text-sm text-gray-700">{contributorWallScript}</code>
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

export default ContributorWallScript;
