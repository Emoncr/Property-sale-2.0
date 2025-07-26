import React from "react";
import AuthImage from "../_pages/Auth/components/AuthImage";

const layout = ({ children }) => {
  return (
    <>
      <div className="w-full flex h-screen overflow-y-auto ">
        <div className="w-[100%] md:w-[55%]">
          <AuthImage />
          <div className="flex justify-center ">
            <div className="md:hidden top-[13%] md:pb-3.5 md:top-[20%] bg-white rounded-xl absolute md:relative w-[90%] md:w-[45%] flex flex-col items-center justify-starts 2xl:justify-center">
              {children}
            </div>
          </div>
        </div>
        <div className="hidden absolute md:relative w-[100%] md:w-[45%] md:flex flex-col items-center justify-start 2xl:justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
