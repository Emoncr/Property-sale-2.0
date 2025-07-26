import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import Image from "next/image";

const MailChimpCard = () => {
  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-primary text-center">
            {"MailChimp Integration"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Image
            src={"/icons/mailChimp.png"}
            alt={"MailChimp Integration"}
            width={279}
            height={118}
            className="h-24 w-auto object-contain"
          />
        </CardContent>
        <CardFooter className="mt-2">
          <Button
          className={`w-full `}
          >
            Connect
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default MailChimpCard;
