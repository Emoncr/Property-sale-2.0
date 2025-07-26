import CampaignEdit from "@/app/_pages/Websites/CampaignEdit";
import campaignApis from "@/app/_pages/Websites/utils/campaignApis";
import contributorWallApis from "@/app/_pages/Websites/utils/contributorWallApis";

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
