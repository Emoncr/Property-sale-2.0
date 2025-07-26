import planAndPaymentApis from "@/app/_pages/Accounts/PlanAndPayments/utils/planAndPaymentApis";
import dynamic from "next/dynamic";
import { createMetadata } from "@/utils/seoGenerator";

const Accounts = dynamic(() => import("@/app/_pages/Accounts/Accounts"), {
  ssr: false,
});

export const metadata = createMetadata({
  title: "Account Management | Square Donations",
  description:
    "Manage your subscription plans and payments easily with Square Donations. Update billing info, view invoices, and control your account settings.",
  keywords: [
    "account management",
    "subscription plans",
    "payment management",
    "billing portal",
    "Square Donations account",
  ],
  path: "/accounts",
  robots: "index, follow",
});

const AccountsPage = async () => {
  const planManagementUrl = await planAndPaymentApis.managePlans({});
  return (
    <>
      <Accounts planManagementUrl={planManagementUrl?.data?.portalUrl} />
    </>
  );
};

export default AccountsPage;
