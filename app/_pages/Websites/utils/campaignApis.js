import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/campaigns`;
const campaignApis = {
  cacheKey: "campaigns",

  getAll: fetchApi({ endpoint, path: `/`, method: "GET" }),
  create: reqApi({ endpoint, path: `/`, method: "POST" }),
  update: (campaign_id) =>
    reqApi({ endpoint, path: `/${campaign_id}`, method: "PUT" }),
  delete: (campaign_id) =>
    reqApi({ endpoint, path: `/${campaign_id}`, method: "DELETE" }),
  list: (website_id) =>
    fetchApi({ endpoint, path: `/website/${website_id}`, method: "GET" }),
  show: (campaign_id) =>
    fetchApi({ endpoint, path: `/${campaign_id}`, method: "GET" }),
  customForm: (campaign_id) =>
    fetchApi({ endpoint, path: `/custom-form/${campaign_id}`, method: "GET" }),
};

export default campaignApis;
