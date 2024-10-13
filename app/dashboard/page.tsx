import React from "react";
import { CreateForm } from "./_components/create-form";
import StreamedData from "./_components/streamed-file";

const page = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <h1 className="text-3xl">Dashboard</h1>
      <CreateForm />
    </div>
  );
};

export default page;
