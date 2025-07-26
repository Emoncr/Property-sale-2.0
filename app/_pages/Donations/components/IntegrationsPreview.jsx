import useUserStore from "@/store/userStore";
import { Link } from "lucide-react";
import NextLink from "next/link";
import React from "react";

const IntegrationsPreview = ({ activeTab }) => {
  const { user } = useUserStore((state) => state);
  return (
    <>
      {activeTab === "Integrations" && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3">
              Connected Services
            </h3>
            <div className="space-y-3">
              {/*================= STRIPE SERVICE CARD  ====================*/}
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-[#635bff] flex items-center justify-center">
                  <Link className="w-3 h-3 text-white" />
                </div>
                <NextLink href="/integrations">
                  <span className="text-sm font-medium text-gray-800 hover:underline">
                    {"Stripe"}
                  </span>
                </NextLink>
                {user?.stripeAccountId ? (
                  <span className="ml-auto px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Connected
                  </span>
                ) : (
                  <span className="ml-auto px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                    Not Connected
                  </span>
                )}
              </div>

              {/* ================= Zapier Service Card ============ */}
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-[#FE5100] flex items-center justify-center">
                  <Link className="w-3 h-3 text-white" />
                </div>
                <NextLink href="/integrations">
                  <span className="text-sm font-medium text-gray-800 hover:underline">
                    {"Zapier"}
                  </span>
                </NextLink>
                {user?.zapierAccountId ? (
                  <span className="ml-auto px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Connected
                  </span>
                ) : (
                  <span className="ml-auto px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                    Not Connected
                  </span>
                )}
              </div>

              {/* ================= Mail Chimp Service Card ============ */}
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <Link className="w-3 h-3 text-white" />
                </div>
                <NextLink href="/integrations">
                  <span className="text-sm font-medium text-gray-800 hover:underline">
                    {"Mail Chimp"}
                  </span>
                </NextLink>
                {user?.mailChimpAccountId ? (
                  <span className="ml-auto px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Connected
                  </span>
                ) : (
                  <span className="ml-auto px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                    Not Connected
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IntegrationsPreview;
