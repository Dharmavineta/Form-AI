import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { userId } = auth();
  return (
    <div className="p-5 border-b flex justify-between items-center">
      <div>
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      </div>

      <div className="flex gap-x-4">
        {userId ? (
          <div className="flex gap-x-4 items-center">
            <Button asChild size={"sm"}>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>

            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-x-8">
            {/* <Button asChild size={"sm"} variant={"outline"}>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button> */}

            <SignInButton>
              <Button size={"sm"}>Get started</Button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
