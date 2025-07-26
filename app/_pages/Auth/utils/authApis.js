import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/auth`;
const authApis = {
  cacheKey: "auth",
  //   googleAuth: fetchApi({ endpoint, path: "/oauth/google", method: "GET" }),
  signup: reqApi({ endpoint, path: `/register`, method: "POST" }),
  signin: reqApi({ endpoint, path: `/login`, method: "POST" }),
  forgotPassword: reqApi({
    endpoint,
    path: `/forget-password`,
    method: "POST",
  }),
  resetPassword: reqApi({
    endpoint,
    path: `/reset-password`,
    method: "POST",
  }),
  verifyOtp: reqApi({
    endpoint,
    path: `/verify-code`,
    method: "POST",
  }),
  updateDonorPassword: reqApi({
    endpoint,
    path: `/donor/update-password`,
    method: "PUT",
  }),
  verifyCode: reqApi({
    endpoint,
    path: `/verify-code`,
    method: "POST",
  }),
  verifyEmail: reqApi({
    endpoint,
    path: `/verify-email`,
    method: "POST",
  }),
  changeEmail: reqApi({
    endpoint,
    path: `/change-email`,
    method: "POST",
  }),
  //   update: (product_id) =>
  //     reqApi({ endpoint, path: `/update/${product_id}`, method: "PUT" }),
  //   delete: (product_id) =>
  //     reqApi({ endpoint, path: `/delete/${product_id}`, method: "DELETE" }),
  // show: (product_id) =>
  //   fetchApi({ endpoint, path: `/show/${product_id}`, method: "GET" }),
};

export default authApis;
