import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/custom-forms`;
const customFormApis = {
  cacheKey: "custom-forms",
  show: (campaign_id) =>
    fetchApi({ endpoint, path: `/campaign/${campaign_id}`, method: "GET" }),

  update: (campaign_id) =>
    reqApi({ endpoint, path: `/${campaign_id}`, method: "PUT" }),
};

export default customFormApis;
