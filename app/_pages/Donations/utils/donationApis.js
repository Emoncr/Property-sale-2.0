import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/donations`;
const donationApis = {
  cacheKey: "donations",
  //   create: reqApi({ endpoint, path: `/`, method: "POST" }),
  delete: (donation_id) =>
    reqApi({ endpoint, path: `/${donation_id}`, method: "DELETE" }),
  donationReport: (campaign_id) =>
    fetchApi({ endpoint, path: `/export/csv/${campaign_id}`, method: "GET" }),
  updateRefund: (donation_id) =>
    fetchApi({ endpoint, path: `/refund/${donation_id}`, method: "GET" }),
};

export default donationApis;
