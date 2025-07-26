import React from "react";
import FundraisingProgress from "./FundraisingProgress";

const ContributorWallPreview = ({ displayType, formState }) => {
  return (
    <div className="p-5 border border-border rounded-md">
      <h4 className="text-lg font-semibold">Preview</h4>
      <div className="mt-4">
        <FundraisingProgress displayType={displayType} formState={formState} />
      </div>
    </div>
  );
};

export default ContributorWallPreview;
