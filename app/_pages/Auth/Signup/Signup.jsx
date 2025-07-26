import dynamic from "next/dynamic";
const SignupForm = dynamic(() => import("./components/SignupForm"), {
  ssr: false,
});
import { SignUp } from "@clerk/nextjs";

const Signup = () => {
  return (
    <>
      <SignUp routing="hash" />
    </>
  );
};

export default Signup;
