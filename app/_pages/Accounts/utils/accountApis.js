import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/profiles`;
const userAccountApis = {
  cacheKey: "profiles",
  update: (user_id) => reqApi({ endpoint, path: `/${user_id}`, method: "POST" }),
};

export default userAccountApis;
