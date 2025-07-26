import CampaignEdit from "@/app/_pages/Websites/CampaignEdit";
import campaignApis from "@/app/_pages/Websites/utils/campaignApis";
import contributorWallApis from "@/app/_pages/Websites/utils/contributorWallApis";
import { createMetadata } from "@/utils/seoGenerator";

export const metadata = createMetadata({
  title: "Manage Campaign | Square Donations",
  description: "Edit your campaign details and manage your contributor wall with ease.",
  keywords: ["campaign edit", "donation campaign", "campaign management"],
  image: "/donation.png",  // Or campaign-specific image if you want to add later
  path: "/websites/campaign-edit",
  robots: "index, follow",
});

const CampaignEditPage = async ({ params }) => {
  const { campaignId } = params;
  const campaignData = await campaignApis.show(campaignId)({});
  const contributorWallData = await contributorWallApis.show(campaignId)({});

  return (
    <div>
      <CampaignEdit
        contributorWallData={contributorWallData?.data}
        campaignData={campaignData?.data}
        campaignId={campaignId}
      />
    </div>
  );
};

export default CampaignEditPage;
