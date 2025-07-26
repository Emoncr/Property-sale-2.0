import PageHeading from "@/components/common/PageHeading";
import CampaignCard from "./components/CampaignCard";
import AddCampaignButton from "./components/AddCampaignButton";
import campaignApis from "../utils/campaignApis";
import { NoDataFound } from "@/components/common/NoDataFound";
import CSVFileUploader from "./CSVFileUploader";
const getCampaigns = async (websiteId) => {
  try {
    const response = await campaignApis.list(websiteId)({
      params: {
        page: 1,
        limit: 100,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
      filter: {},
    });
    return response?.data?.items || [];
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return null;
  }
};

const Campaigns = async ({ websiteId }) => {
  const campaigns = await getCampaigns(websiteId);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-col md:flex-row md:flex">
          <div>
            <PageHeading pageName="Campaigns" />
            <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-slate-500 md:mb-0 mb-2">
                Manage your campaigns and their settings here.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto md:ml-auto">
            <CSVFileUploader />
          </div>
        </div>
        <div className="flex flex-wrap gap-6 gap-y-8 mt-6">
          {campaigns === null ? (
            <NoDataFound
              title="Error loading campaigns"
              description="Failed to fetch campaigns. Please try again later."
            />
          ) : campaigns.length > 0 ? (
            <>
              {campaigns.map((campaign) => (
                <CampaignCard
                  websiteId={websiteId}
                  key={campaign._id}
                  campaign={campaign}
                />
              ))}
              <AddCampaignButton websiteId={websiteId} />
            </>
          ) : (
            <div className="flex flex-wrap gap-6 gap-y-8 mt-6">
              <NoDataFound
                title="No campaigns found"
                description="There are no campaigns to display yet. Get started by creating your first campaign."
              />
              <AddCampaignButton websiteId={websiteId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;