import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/contributor-wall`;
const contributorWallApis = {
  cacheKey: "contributor-wall",
  show: (campaign_id) =>
    fetchApi({
      endpoint,
      path: `/campaign/${campaign_id}/settings`,
      method: "GET",
    }),
  update: (campaign_id) =>
    reqApi({ endpoint, path: `/${campaign_id}`, method: "PUT" }),
};

export default contributorWallApis;
