"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { BarChart, LibraryBig, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();
  const menuList = [
    { id: 1, name: "My Forms", icon: LibraryBig, path: "/dashboard" },
    {
      id: 2,
      name: "Responses",
      icon: MessageCircle,
      path: "/dashboard/responses",
    },
    { id: 3, name: "Analytics", icon: BarChart, path: "/dashboard/analytics" },
    {
      id: 4,
      name: "Subscription",
      icon: Shield,
      path: "/dashboard/subscription",
    },
  ];

  return (
    <div className="hidden md:flex md:flex-col h-screen md:w-64 md:fixed border-r">
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-grow">
          <div className="flex flex-col pl-5 pt-5 gap-y-5 ">
            {menuList.map((menu, i) => (
              <Link
                href={menu.path}
                key={menu.id}
                className={cn(
                  `flex items-center text-gray-500 hover:text-gray-900 text-sm p-4 gap-x-4 hover:bg-sky-200/50 rounded-tr-none rounded-br-none rounded-tl-md rounded-bl-md hover:border-r-2 border-sky-500 transition-colors duration-300`,
                  pathName === menu.path &&
                    "text-gray-900 bg-sky-200/50 border-r-2 border-sky-500"
                )}
              >
                <menu.icon className="w-4 h-4 text-sky-900" />
                {menu.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
        <div className="md:fixed md:bottom-7 w-64 px-3 flex flex-col gap-y-5">
          {/* <Button variant="default" className="w-full">
            Create Form
          </Button> */}
          <div className="flex flex-col gap-y-2">
            <h1 className="text-sm">
              <strong>2</strong> Out of <strong>3</strong> forms created
            </h1>
            <Progress value={50} />
          </div>
          <h1 className="text-sm text-muted-foreground">
            Upgrade your plan for unlimited AI form Generations
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
