"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import useUserStore from "@/store/userStore";

const WebsiteIntegrationGuide = ({ onClose, websiteDomain }) => {
  const [copied, setCopied] = useState(false);
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("squarespace");
  const scriptCode = `<script src="https://staging.squaredonations.com/script.js" data-organization=${
    user._id || ""
  }></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddWebsite = () => {
    if (websiteDomain) {
      window.open(websiteDomain, "_blank");
      onClose();
    }
  };

  return (
    <>
      <p className="text-lg font-primary font-semibold text-left text-gray-700 mb-2">
        Connect Your Website
      </p>

      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-base font-primary text-gray-700 font-medium">
            1. Copy the following:
          </p>
          <div className="grid gap-3">
            <div className="flex-1 border rounded-md p-3 bg-gray-50 text-gray-600 font-mono text-sm overflow-x-auto">
              {scriptCode}
            </div>
            <Button
              onClick={handleCopy}
              className="bg-primary hover:bg-primary/90 text-white h-9 px-5 text-sm"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-base font-primary text-gray-700 font-medium">
            2. Install it on your website
          </p>
          <p className="text-sm font-primary text-gray-500">
            Paste it before the &lt;/body&gt; tag on your website.
          </p>

          <Tabs
            defaultValue="squarespace"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="border-b w-full justify-start rounded-none bg-transparent h-auto p-0 mb-2">
              {[
                "squarespace",
                "wordpress",
                "wix",
                "webly",
                "framer",
                "other",
              ].map((platform) => (
                <TabsTrigger
                  key={platform}
                  value={platform}
                  className={`px-4 py-2 text-sm rounded-none border-b-2 capitalize font-primary font-medium ${
                    activeTab === platform
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {platform}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="squarespace" className="mt-0">
              <ol className="list-decimal pl-5 space-y-1 text-sm font-primary text-gray-700">
                <li>Log in to your Squarespace dashboard.</li>
                <li>Go to Settings → Advanced → Code Injection.</li>
                <li>Paste the script into the Footer box.</li>
                <li>Save changes.</li>
              </ol>
            </TabsContent>

            <TabsContent value="wordpress" className="mt-0">
              <p className="text-sm font-primary text-gray-700">
                WordPress installation instructions would go here.
              </p>
            </TabsContent>

            <TabsContent value="wix" className="mt-0">
              <p className="text-sm font-primary text-gray-700">
                Wix installation instructions would go here.
              </p>
            </TabsContent>

            <TabsContent value="webly" className="mt-0">
              <p className="text-sm font-primary text-gray-700">
                Webly installation instructions would go here.
              </p>
            </TabsContent>

            <TabsContent value="framer" className="mt-0">
              <p className="text-sm font-primary text-gray-700">
                Framer installation instructions would go here.
              </p>
            </TabsContent>

            <TabsContent value="other" className="mt-0">
              <p className="text-sm font-primary text-gray-700">
                General installation instructions for other platforms would go
                here.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-sm font-primary text-gray-700">
          Need help?{" "}
          <a href="#" className="text-primary hover:underline">
            View Installation Guide
          </a>
        </p>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 py-2 h-9 text-sm font-primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddWebsite}
            className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 h-9 text-sm font-primary"
          >
            Add Script
          </Button>
        </div>
      </div>
    </>
  );
};

export default WebsiteIntegrationGuide;
