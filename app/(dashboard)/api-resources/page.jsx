import ApiResources from "@/app/_pages/ApiResources/ApiResources";
import React from "react";
import { createMetadata } from "@/utils/seoGenerator";

export const metadata = createMetadata({
  title: "API Resources | Square Donations",
  description: "Comprehensive API documentation to connect and manage users, campaigns, and donations efficiently.",
  keywords: [
    "API documentation",
    "Square Donations API",
    "get users API",
    "get campaigns API",
    "get donations API",
    "campaign details by ID API",
    "donation details by ID API",
  ],
  path: "/api-resources",
  robots: "index, follow",
});

const ApiResourcesPage = () => {
  return (
    <>
      <ApiResources />
    </>
  );
};

export default ApiResourcesPage;
