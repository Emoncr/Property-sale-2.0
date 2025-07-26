"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionTable from "./SubscriptionTable";
import AccountInfo from "./AccountInfo";

export function DonorSubscriptionsTable() {
  return (
    <Card className="border border-border shadow-lg bg-white pt-6">
      <Tabs defaultValue="donations" className="px-4 sm:px-6 lg:px-8">
        <TabsList>
          <TabsTrigger value="donations">Subscription Donations</TabsTrigger>
          <TabsTrigger value="account">Account Info</TabsTrigger>
        </TabsList>
        <TabsContent value="donations" className="mt-8">
          <SubscriptionTable />
        </TabsContent>
        <TabsContent value="account" className="mt-8">
          <AccountInfo />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
