import Notifications from "@/app/_pages/Notifications/Notifications";
import React from "react";
import { createMetadata } from "@/utils/seoGenerator";

export const metadata = createMetadata({
  title: "Donation Notifications | Square Donations",
  description: "Manage your donation alerts and stay updated with real-time notifications about your campaigns and supporters.",
  keywords: [
    "donation notifications",
    "alerts",
    "campaign updates",
    "fundraising notifications",
    "donor alerts",
  ],
  path: "/notifications",
  robots: "index, follow",
});

const NotificationsPage = () => {
  return (
    <>
      <Notifications />
    </>
  );
};

export default NotificationsPage;
