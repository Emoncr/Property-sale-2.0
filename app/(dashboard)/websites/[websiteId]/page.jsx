import Campaigns from "@/app/_pages/Websites/Campaigns/Campaigns";
import { createMetadata } from "@/utils/seoGenerator";

export async function generateMetadata({ params }) {
  const websiteId = params.websiteId;

  // Static metadata, no fetch
  return createMetadata({
    title: `Campaigns | Square Donations`,
    description: `Manage and organize your donations campaigns with ease.`,
    keywords: ["donations", "campaigns", "fundraisers", "organization"],
    image: "/donation.png",
    path: `/websites/${websiteId}/campaigns`,
  });
}

export default function Page({ params }) {
  return <Campaigns websiteId={params.websiteId} />;
}
