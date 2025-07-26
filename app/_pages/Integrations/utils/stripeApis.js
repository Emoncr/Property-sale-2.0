import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/stripe`;
const stripeIntegrationsApis = {
  cacheKey: "integrations",
  stripeData: fetchApi({ endpoint, path: `/connect`, method: "GET" }),
};

export default stripeIntegrationsApis;
