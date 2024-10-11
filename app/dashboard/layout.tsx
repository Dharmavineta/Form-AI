import React, { FC } from "react";
import Sidebar from "./_components/Sidebar";

type props = {
  children: React.ReactNode;
};

const layout: FC<props> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1">{children}</div>
    </div>
  );
};

export default layout;
