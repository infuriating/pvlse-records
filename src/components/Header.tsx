import Border from "@/components/ui/border";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <>
      <div className="flex py-2 items-center">
        <div className="px-8 flex justify-center items-center w-max">
          <Link href={"/"}>
            <p className="font-black text-3xl lg:text-4xl">PVLSE</p>
          </Link>
        </div>
        <Border size={24} />
        <div className="pr-12 font-semibold flex gap-x-4 w-full justify-end">
          <Link href="/artists">Artists</Link>
          <Link href="/tracks">Tracks</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <Separator />
    </>
  );
}
