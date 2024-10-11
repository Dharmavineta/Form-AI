import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="p-5 border-b flex justify-between items-center">
      <div>
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      </div>
      <div>
        <Button size={"sm"}>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
