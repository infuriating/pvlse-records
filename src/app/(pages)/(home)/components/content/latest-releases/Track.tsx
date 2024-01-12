import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Track() {
  return (
    <Link href="#">
      <div className="bg-gray-200 border h-36 aspect-square rounded-lg overflow-hidden">
        <Image
          src="/dashie.png"
          height={144}
          width={144}
          alt="nevoa"
          className="object-cover h-full w-full"
        />
      </div>
      <p className="font-bold leading-4 pt-2">nevoa</p>
      <p className="text-sm">dashie & ISXRO</p>
    </Link>
  );
}
