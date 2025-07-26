"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Modal from "@/components/ui/Modal";
import { Lock } from "lucide-react";
import Image from "next/image";
import StripeConnectModal from "./StripeConnectModal";
import { useState } from "react";
import useUserStore from "@/store/userStore";
const StripeCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserStore((state) => state);

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-primary text-center">
            {"Stripe Integration"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Image
            src={"/icons/stripe.png"}
            alt={"Stripe Integration"}
            width={279}
            height={118}
            className="h-24 w-auto object-contain"
          />
        </CardContent>
        <CardFooter className="mt-2">
          <Button
            className={`w-full ${
              !user?.user?.stripeAccountId
                ? "bg-primary hover:bg-primary/90"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={() => setIsModalOpen(true)}
          >
            {user?.user?.stripeAccountId ? "Disconnect" : "Connect"}
          </Button>
          <Modal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            isCancelButtonVisible={true}
            maxWidth="4xl"
            element={
              <StripeConnectModal
                data={data}
                onClose={() => setIsModalOpen(false)}
              />
            }
          ></Modal>
        </CardFooter>
      </Card>
    </>
  );
};

export default StripeCard;
