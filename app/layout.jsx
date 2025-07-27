import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { getToken } from "@/lib/action";
import Providers from "@/utils/swr-provider/provider";
import { Inter, Open_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Change font if needed
const inter = Open_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
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
