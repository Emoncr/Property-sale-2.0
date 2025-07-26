import OrganizerLogin from "@/app/_pages/Auth/OrganizerLogin/OrganizerLogin";
import React from "react";

export const metadata = {
  title: "Organizer Login | Square Donations",
  description: "Login to your organizer account to manage campaigns and donations.",
  keywords: ["organizer login", "square donations", "campaign management"],
  robots: "noindex, nofollow", // Protect login page from indexing
};

const OrganizerLoginPage = () => {
  return (
    <>
      <OrganizerLogin />
    </>
  );
};

export default OrganizerLoginPage;
