import React from "react";
import Head from "next/head";

function Custom404() {
  return (
    <>
      <Head>
        <title>404: This page could not be found</title>
      </Head>
      <h1 className="title">Page not found</h1>
      <p>The requested page could not be found.</p>
    </>
  );
}

export default Custom404;
