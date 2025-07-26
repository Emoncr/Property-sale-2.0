import React from "react";
import ApiKeyDisplay from "./components/ApiKeyDisplay";
import ApiDocumentation from "./components/ApiDocumentation";

const ApiResources = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-gray-800 text-center md:text-left">
          API Resources
        </h2>
        <ApiKeyDisplay />
        <ApiDocumentation />
      </div>
    </>
  );
};

export default ApiResources;
