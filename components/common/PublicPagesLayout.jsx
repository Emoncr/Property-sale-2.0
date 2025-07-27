import React from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

const PublicPagesLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default PublicPagesLayout;
