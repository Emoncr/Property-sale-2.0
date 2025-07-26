import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/integrations`;
const integrationApis = {
  cacheKey: "integrations",
  stripeData: fetchApi({ endpoint, path: `/`, method: "GET" }),
};

export default integrationApis;
