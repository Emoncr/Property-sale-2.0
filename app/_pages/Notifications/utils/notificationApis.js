import { fetchApi, reqApi } from "@/utils/apiMaker";

const endpoint = `/notification-templates`;
const notificationApis = {
  cacheKeyforContributionConfirmation: "notification-templates-ContributionConfirmation",
  cacheKeyforContributionStatus: "notification-templates-ContributionStatus",
  update: reqApi({ endpoint, path: `/`, method: "PUT" }),
  getContributionNotificationsTemplate: fetchApi({endpoint ,path: "/?type=thank_you",method: "GET"}),
  getContributionStatusNotificationsTemplate: fetchApi({endpoint: "/notification-templates", path: "/?type=donation_status", method: "GET",})
};

export default notificationApis;
