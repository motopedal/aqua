import { Helmet } from "react-helmet";
import React from "react";

function Custom404() {
  return (
    <div className="flex flex-col py-20 font-bold items-center h-screen">
      <Helmet>
        <title>404: This page could not be found</title>
      </Helmet>
      <h1>Page not found</h1>
      <p>The requested page could not be found.</p>
    </div>
  );
}

export default Custom404;
