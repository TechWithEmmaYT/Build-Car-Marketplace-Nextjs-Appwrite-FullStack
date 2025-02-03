import React, { Suspense } from "react";
import ProfileMessages from "./_profileMessages";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileMessages />
    </Suspense>
  );
};

export default Page;
