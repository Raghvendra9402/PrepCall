"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserButton, useSession } from "@clerk/nextjs";

export function Header() {
  const { isSignedIn } = useSession();
  return (
    <div className="px-10 py-4">
      <div className="flex items-center justify-between">
        <div>
          <Link href={"/"} className="text-lg font-semibold">
            Smart-Interviewer
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          {isSignedIn ? (
            <>
              <Link href={"/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
              <UserButton />
            </>
          ) : (
            <div className="flex items-center gap-x-2">
              <Link href={"/sign-in"}>
                <Button>Sign-in</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button>Sign-up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
