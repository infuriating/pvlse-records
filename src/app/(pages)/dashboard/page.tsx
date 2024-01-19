import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center items-center">
      <Link href={"/dashboard/add-artist"}>
        <Button variant={"outline"}>Add Artist</Button>
      </Link>
    </div>
  );
}
