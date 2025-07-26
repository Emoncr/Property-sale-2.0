import Signup from "@/app/_pages/Auth/Signup/Signup";
import React from "react";

export const metadata = {
  title: "Sign Up | Square Donations",
  description: "Create your organizer account to start managing campaigns and donations.",
  keywords: ["signup", "register", "square donations", "organizer account"],
  robots: "noindex, nofollow", // Signup pages are usually not indexed to prevent spam
};

const SignupPage = () => {
  return (
    <>
      <Signup />
    </>
  );
};

export default SignupPage;
