"use client";
import { Separator } from "@/components/ui/separator";
import WebsiteNavbar from "../Websites/components/WebsiteNavbar";
import OrganizerProfileForm from "./components/OrganizerProfileForm";
import PageHeading from "@/components/common/PageHeading";
import OrganizerAccountForm from "./components/OrganizerAccountForm";
import { useSearchParams } from "next/navigation";
import SubscriptionPlans from "./PlanAndPayments/SubscriptionPlans";
import { OrganizerBillings } from "./components/OrganizerBillings";
import ResetPasswordForm from "./components/ResetPasswordForm";

const Accounts = ({ planManagementUrl }) => {
  const currentTab = useSearchParams().get("tab") || "details";
  const navbarOptions = [
    {
      id: 1,
      name: "Account / Org Info",
      route: "",
    },
    {
      id: 2,
      name: "User Info",
      route: "",
    },
    {
      id: 3,
      name: "Plans",
      route: "",
    },
    /*{
      id: 4,
      name: "Billings",
      route: "",
    },*/
  ];
  return (
    <>
      <div>
        <PageHeading pageName="Accounts" />
      </div>
      <div className="  bg-white rounded-xl border px-4 pt-6 pb-16">
        <WebsiteNavbar tabs={navbarOptions} />
        <Separator className="my-4" />

        {currentTab === "1" ? (
          <OrganizerProfileForm />
        ) : currentTab === "2" ? (
          <>
            <OrganizerAccountForm />
            <ResetPasswordForm />
          </>
        ) : currentTab === "3" ? (
          <>
            <SubscriptionPlans planManagementUrl={planManagementUrl} />
          </>
        ) : (
          //: currentTab === "4" ? (
          //<>
          // <OrganizerBillings />
          //</div></>
          // )
          <OrganizerProfileForm />
        )}
      </div>
    </>
  );
};

export default Accounts;
