// app/websites/page.tsx or page.jsx

import React from "react";
import Websites from "@/app/_pages/Websites/Websites";
import { createMetadata } from "@/utils/seoGenerator";

export const metadata = createMetadata({
  title: "Websites | Square Donations",
  description: "Discover and manage all your linked websites from one place.",
  keywords: ["websites", "dashboard", "link management", "Square Donations"],
  path: "/websites",
});

const WebsitesPage = () => {
  return <Websites />;
};

export default WebsitesPage;
