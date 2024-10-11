import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const Sidebar = () => {
  return (
    <div className="hidden md:block h-screen md:w-64 md:fixed bg-gray-100">
      <ScrollArea className="h-full">Sidebar</ScrollArea>
    </div>
  );
};

export default Sidebar;
