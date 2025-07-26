import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Star, Loader } from "lucide-react";
import PlanFeature from "./PlanFeature";

const ProPlanCard = ({
  handleSubscriptionPurchase,
  planName,
  planType,
  annualPlanLoading,
  lifetimePlanLoading,
}) => {
  return (
    <>
      <Card
        className={`border-gray-200 hover:border-primary/10 hover:shadow-lg transition-all  ${
          planName === "pro"
            ? "border-primary/60 bg-primary/5 hover:!border-primary/60"
            : ""
        } `}
      >
        <CardHeader className="pb-4 pt-6">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-gray-900">
              Pro
            </CardTitle>
            {planName === "pro" && <Badge>Current Plan</Badge>}
          </div>
          <CardDescription className="text-gray-600 mt-2 text-sm">
            Advanced tools for growing organizations
          </CardDescription>
          <div className="mt-4">
            <div className="flex items-end">
              <span className="text-3xl font-bold">$19.99</span>
              <span className="text-gray-500 ml-1 text-sm">/month</span>
            </div>
            <div className="text-gray-500 text-sm mt-1">
              <span className="font-medium">$239.88</span> billed annually
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-8">
          <div className="mb-6 space-y-3">
            <Button
              onClick={() =>
                handleSubscriptionPurchase({
                  planName: "pro",
                  planType: "annual",
                })
              }
              className="w-full border-gray-300"
              disabled={
                (planName === "pro" && planType === "annual") ||
                (planType === "lifetime" && planName === "pro") ||
                annualPlanLoading ||
                lifetimePlanLoading
              }
            >
              {annualPlanLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Select Annual Plan"
              )}
            </Button>
          </div>

          <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-gray-900">
                Early Bird Special
              </span>
            </div>
            <div className="flex items-end">
              <span className="text-xl font-bold">$449</span>
              <span className="text-gray-500 ml-1 text-sm">
                one-time payment
              </span>
            </div>
            <Button
              onClick={() =>
                handleSubscriptionPurchase({
                  planName: "pro",
                  planType: "lifetime",
                })
              }
              variant="secondary"
              className="w-full mt-3 border-gray-300"
              disabled={
                (planType === "lifetime" && planName === "pro") ||
                lifetimePlanLoading ||
                annualPlanLoading
              }
            >
              {lifetimePlanLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Select Lifetime Plan"
              )}
            </Button>
          </div>

          <h3 className="font-semibold text-base mb-4 text-gray-900 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Everything in Free, plus:
          </h3>
          <ul className="space-y-3 text-sm">
            <PlanFeature included>Up to 3 websites</PlanFeature>
            <PlanFeature included>0% Platform Fee</PlanFeature>
            <PlanFeature included>Priority Support</PlanFeature>
            <PlanFeature included>Zapier Integration</PlanFeature>
            <PlanFeature included>Mailchimp Integration</PlanFeature>
            <PlanFeature included>Import Existing Campaigns</PlanFeature>
            <PlanFeature included>Advanced Analytics</PlanFeature>
            <PlanFeature included>Team Members</PlanFeature>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default ProPlanCard;
