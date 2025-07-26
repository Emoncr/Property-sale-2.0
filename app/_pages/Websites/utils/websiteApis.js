import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/websites`;
const websiteApis = {
  cacheKey: "websites",
  create: reqApi({ endpoint, path: `/`, method: "POST" }),
  list: fetchApi({ endpoint, path: `/`, method: "GET" }),
  update: (website_id) =>
    reqApi({ endpoint, path: `/${website_id}`, method: "PUT" }),
  delete: (website_id) =>
    reqApi({ endpoint, path: `/${website_id}`, method: "DELETE" }),
  // show: (product_id) =>
  //   fetchApi({ endpoint, path: `/show/${product_id}`, method: "GET" }),
};

export default websiteApis;
