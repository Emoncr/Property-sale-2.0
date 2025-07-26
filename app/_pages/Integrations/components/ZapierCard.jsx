import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ZapierCard = () => {
  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-primary text-center">
            {"Zapier Integration"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Image
            src={"/icons/zapier.png"}
            alt={"Zapier Integration"}
            width={279}
            height={118}
            className="h-24 w-auto object-contain"
          />
        </CardContent>
        <CardFooter className="mt-2">
          <Button
            className={`w-full `}
            // onClick={() => handleAction(integration)}
          >
            View Api Key
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ZapierCard;
