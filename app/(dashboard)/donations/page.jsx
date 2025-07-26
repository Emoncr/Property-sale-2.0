import Donations from "@/app/_pages/Donations/Donations";
import React from "react";
import { createMetadata } from "@/utils/seoGenerator";

export const metadata = createMetadata({
  title: "Donations | Square Donations",
  description: "Easily manage one-time and recurring donations for your campaigns. Simplify fundraising with our reliable donation platform.",
  keywords: [
    "donations",
    "one-time donation",
    "recurring donation",
    "fundraising",
    "charity donations",
    "online donations",
  ],
  image: "/donation.png",
  path: "/donations",
  robots: "index, follow",
});

const DonationsPage = () => {
  return (
    <div>
      <Donations />
    </div>
  );
};

export default DonationsPage;
