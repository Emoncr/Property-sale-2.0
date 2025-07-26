import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Zap, Star } from "lucide-react";
import PlanFeature from "./PlanFeature";

const FreePlanCard = ({ planName }) => {
  return (
    <>
      <Card
        className={`border-gray-200 hover:border-primary/10 hover:shadow-lg transition-all  ${
          planName === "Free"
            ? "border-primary/60 bg-primary/5 hover:!border-primary/60"
            : ""
        } `}
      >
        <CardHeader className="pb-4 pt-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Free
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-500 ml-1 text-sm">/forever</span>
              </div>
            </div>
            {planName === "Free" && <Badge>Current Plan</Badge>}
          </div>
          <CardDescription className="text-gray-600 mt-2 text-sm">
            Essential features to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 pb-8">
          <div className="mb-6">
            <Button
              disabled={planName === "Free" || planName === "pro"}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Continue with Free Plan
            </Button>
          </div>
          <h3 className="font-semibold text-base mb-4 text-gray-900 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            {"What's included:"}
          </h3>
          <ul className="space-y-3 text-sm">
            <PlanFeature included>1 Website</PlanFeature>
            <PlanFeature included>1% Platform Fee</PlanFeature>
            <PlanFeature included>Unlimited campaigns</PlanFeature>
            <PlanFeature included>Customizable Widget Styles</PlanFeature>
            <PlanFeature included>Mobile Optimization</PlanFeature>
            <PlanFeature included>Detailed Donation Reports</PlanFeature>
            <PlanFeature included>Email Support</PlanFeature>
            <PlanFeature>Zapier Integration</PlanFeature>
            <PlanFeature>Mailchimp Integration</PlanFeature>
            <PlanFeature>Import Existing Campaigns</PlanFeature>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default FreePlanCard;
