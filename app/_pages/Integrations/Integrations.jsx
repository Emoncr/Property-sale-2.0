import PageHeading from "@/components/common/PageHeading";
import React from "react";
import MailChimpCard from "./components/MailChimpCard";
import StripeCard from "./components/StripeCard";
import ZapierCard from "./components/ZapierCard";
import integrationApis from "./utils/integrationApis";
import stripeIntegrationsApis from "./utils/stripeApis";

const Integrations = async () => {
  const stripeData = await stripeIntegrationsApis.stripeData({});

  return (
    <>
      <PageHeading pageName="Integrations" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mt-8">
        <>
          <MailChimpCard />
          <StripeCard data={stripeData} />
          <ZapierCard />
        </>
      </div>
    </>
  );
};

export default Integrations;
