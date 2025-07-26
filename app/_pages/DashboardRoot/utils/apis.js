import { fetchApi, reqApi } from "@/utils/apiMaker";


const profileEndpoint = `/profiles`;
const websiteEndpoint = `/websites`
const topCampaigns = `/campaigns`
const topDonors = `/donations`
const dashboardRootApis = {
  cacheKey: "auth",
  websiteCacheKey: "websiteCache",
  campaignCacheKey: "campaignCache",
  donnerCacheKey: "donnerCache",
  userProfile: fetchApi({ endpoint: profileEndpoint, path: "/user/me", method: "GET" }),
  useWebsite: fetchApi({ endpoint: websiteEndpoint, path: "/", method: "GET" }),
  getTopCampaigns: fetchApi({ endpoint: topCampaigns, path: "/top/campaigns", method: "GET" }),
  getTopDonor: fetchApi({ endpoint: topDonors, path: `/organizer/top-donors`, method: "GET" }),


  //   update: (product_id) =>
  //     reqApi({ endpoint, path: `/update/${product_id}`, method: "PUT" }),
  //   delete: (product_id) =>
  //     reqApi({ endpoint, path: `/delete/${product_id}`, method: "DELETE" }),
  // show: (product_id) =>
  //   fetchApi({ endpoint, path: `/show/${product_id}`, method: "GET" }),
};

export default dashboardRootApis;
