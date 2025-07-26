import React from "react";

const PageHeading = ({ pageName }) => {
  return (
    <>
      {pageName && (
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold  font-primary text-black">
            {pageName}
          </h2>
        </div>
      )}
    </>
  );
};

export default PageHeading;
