import { WebsiteCard } from "./components/WebsiteCard";
import PageHeading from "@/components/common/PageHeading";
import AddWebsite from "./components/AddWebsite";
import websiteApis from "./utils/websiteApis";
import { NoDataFound } from "@/components/common/NoDataFound";

const getData = async (pageNumber) => {
  try {
    const response = await websiteApis.list({
      params: {
        page: pageNumber,
        limit: 100,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default async function Websites() {
  // const response = await  getWebsites
  const response = await getData(1);
  const websites = response?.items || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeading pageName="Websites" />
        <AddWebsite />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {websites.length > 0 ? (
          websites.map((website) => (
            <WebsiteCard key={website._id} website={website} />
          ))
        ) : (
          <>
            <NoDataFound
              title="No websites found"
              description="There's nothing to display here yet. Get started by adding new items."
              className="col-span-4 h-[400px]"
            />
          </>
        )}
      </div>
    </div>
  );
}
