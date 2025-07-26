import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { getToken } from "@/lib/action";
import Providers from "@/utils/swr-provider/provider";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { createMetadata } from "@/utils/seoGenerator";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Change font if needed
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = createMetadata({
  keywords: [
    "donations",
    "fundraising",
    "campaign management",
    "charity",
    "nonprofit",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Square Donations",
  },
  custom: {
    robots: "index, follow",
    themeColor: "#008C8B",
  },
});

export default async function RootLayout({ children }) {
  const token = await getToken();
  return (
    <html lang="en">
      <body className={`${inter.variable} font-primary  antialiased`}>
        <Providers token={token}>
          <SonnerToaster />
          <Toaster position="top-center" reverseOrder={false} />
          <NextTopLoader
            color="#008C8B"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
          />
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            {children}
          </ClerkProvider>
        </Providers>
      </body>
    </html>
  );
}
