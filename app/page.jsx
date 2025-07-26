import { createMetadata } from "@/utils/seoGenerator";
import Home from "./home";
export async function generateMetadata() {
  return createMetadata({
    title: "Dashboard | Square Donations",
    description:
      "Welcome to your dashboard where you can manage your activities and track updates.",
    image: "/donation.png",
    path: "/",
    keywords: ["dashboard", "user profile", "analytics"],
    author: "Square Donations",
    robots: "index, follow",
    openGraph: {
      title: "Dashboard | Square Donations",
      description: "Track activities, data, and updates.",
      url: "https://squaredonations.com",
      siteName: "Square Donations",
      images: [
        {
          url: "/donation.png",
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "User Dashboard | Square Donations",
      description: "Track activities, data, and updates.",
      images: ["/donation.png"],
    },
  });
}

export default function Page() {

  return <Home />;
}
