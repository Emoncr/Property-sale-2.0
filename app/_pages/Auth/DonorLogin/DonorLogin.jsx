import React from "react";
import dynamic from "next/dynamic";

const DonorLoginForm = dynamic(() => import("./components/DonorLoginForm"), {
  ssr: false,
});

const DonorLogin = () => {
  return (
    <>
      <DonorLoginForm />
    </>
  );
};

export default DonorLogin;
