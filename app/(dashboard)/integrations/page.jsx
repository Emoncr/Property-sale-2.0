import Integrations from "@/app/_pages/Integrations/Integrations";
import React from "react";
import { createMetadata } from "@/utils/seoGenerator";

export const metadata = createMetadata({
  title: "Integrations | Square Donations",
  description: "Connect with popular payment and marketing tools like Stripe, Zapier, and Mailchimp to supercharge your donation platform.",
  keywords: [
    "payment integration",
    "Stripe",
    "Zapier",
    "Mailchimp",
    "donation platform integrations",
    "fundraising tools",
    "marketing automation",
  ],
  path: "/integrations",
  robots: "index, follow",
});

const IntegrationsPage = () => {
  return (
    <>
      <Integrations />
    </>
  );
};

export default IntegrationsPage;
