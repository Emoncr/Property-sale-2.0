import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { getToken } from "@/lib/action";
import Providers from "@/utils/swr-provider/provider";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { createMetadata } from "@/utils/seoGenerator";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

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
        {/* HelpScout Beacon Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.Beacon('init', 'bd0411a0-123a-4611-81db-fbdf762969fe');`,
          }}
        />
      </body>
    </html>
  );
}
