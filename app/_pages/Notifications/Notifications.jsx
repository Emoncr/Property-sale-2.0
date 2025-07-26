import PageHeading from "@/components/common/PageHeading";
import { Button } from "@/components/ui/button";
import { Settings, ChevronLeft, Send } from "lucide-react";
import React from "react";
import NotificationCards from "./components/NotificationCards";

const Notifications = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex md:items-center justify-between flex-col lg:flex-row gap-y-4">
        <PageHeading pageName="Notifications" />
        <div>
          <Button variant="secondary" className="w-full md:w-auto">
            <Settings size={16} />
            Notification Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 md:mt-10">
        <NotificationCards />
      </div>
    </div>
  );
};

export default Notifications;
