import dynamic from "next/dynamic";
const OrganizerLoginForm = dynamic(
  () => import("./components/OrganizerLoginForm"),
  {
    ssr: false,
  }
);
import { SignIn } from "@clerk/nextjs";
const OrganizerLogin = () => {
  // return <OrganizerLoginForm />;
  return <SignIn routing="hash" />;
};

export default OrganizerLogin;
