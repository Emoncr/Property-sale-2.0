"use client";
import { Button } from "@/components/ui/button";
import ProPlanCard from "./components/ProPlanCard";
import FreePlanCard from "./components/FreePlanCard";
import useUserStore from "@/store/userStore";
import useRequest from "@/hooks/useRequest";
import planAndPaymentApis from "./utils/planAndPaymentApis";
import { useState } from "react";

export default function SubscriptionPlans({ planManagementUrl }) {
  const [annualPlanLoading, setAnnualPlanLoading] = useState(false);
  const [lifetimePlanLoading, setLifetimePlanLoading] = useState(false);
  const { user } = useUserStore((state) => state.user);

  const { handleRequest } = useRequest();
  const handleSubscriptionPurchase = async ({ planName, planType }) => {
    if (planType === "annual") {
      setAnnualPlanLoading(true);
    } else if (planType === "lifetime") {
      setLifetimePlanLoading(true);
    }
    await handleRequest({
      data: { planName, planType },
      request: planAndPaymentApis.upgrade,
      cacheKey: planAndPaymentApis.cacheKey,
      isToast: true,
      handleComplete: (responseData) => {
        setAnnualPlanLoading(false);
        setLifetimePlanLoading(false);
        if (responseData?.success) {
          window.location.href = responseData?.data?.checkoutUrl;
        }
      },
    });
  };

  const handleManageSubscription = () => {
    if (planManagementUrl) {
      window.location.href = planManagementUrl;
    }
  };


  return (
    <div className="mx-auto px-4 py-8 max-w-6xl font-primary">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plans & Payments</h1>
          {user?.subscribedPlan?.price > 0 && (
            <p className="text-gray-600 mt-2">
              Your{" "}
              {user?.subscribedPlan?.planType === "lifetime"
                ? "lifetime plan"
                : "yearly subscription"}{" "}
              price is
              {` $${user?.subscribedPlan?.price}`}
            </p>
          )}
        </div>
        <Button
          onClick={handleManageSubscription}
          className="bg-primary hover:bg-primary/90 text-white text-sm px-6 py-2 h-auto shadow-sm"
        >
          Manage Subscription
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <FreePlanCard planName={user?.subscribedPlan?.name} />

        {/* Pro Plan */}
        <ProPlanCard
          annualPlanLoading={annualPlanLoading}
          lifetimePlanLoading={lifetimePlanLoading}
          handleSubscriptionPurchase={handleSubscriptionPurchase}
          planName={user?.subscribedPlan?.name}
          planType={user?.subscribedPlan?.planType}
        />
      </div>
    </div>
  );
}
