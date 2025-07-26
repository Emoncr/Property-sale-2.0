import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/plans`;
const planAndPaymentApis = {
  cacheKey: "planAndPayment",
  upgrade: reqApi({ endpoint, path: `/upgrade`, method: "POST" }),
  managePlans: fetchApi({ endpoint, path: "/manage", method: "GET" }),
};

export default planAndPaymentApis;
