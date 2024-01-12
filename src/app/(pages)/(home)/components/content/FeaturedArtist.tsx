import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FeaturedArtist() {
  return (
    <div className="grid place-items-center pt-12 md:pt-0 lg:place-items-end w-full pr-12">
      <p className="text-sm font-bold">Featured Artist</p>
      <div className="border mt-2 p-4">
        <div className="border bg-gray-200 h-60 xl:h-96 aspect-square rounded-lg overflow-hidden">
          <Image
            src="/dashie.png"
            alt="Dashie"
            height={384}
            width={384}
            objectFit="cover"
          />
        </div>
        <p className="font-bold text-lg pt-2 text-center">dashie</p>
        <div className="flex justify-center gap-x-4 mt-2">
          <Link href="#">
            <Skeleton className="border h-12 aspect-square bg-muted rounded-full" />
          </Link>
          <Link href="#">
            <Skeleton className="border h-12 aspect-square bg-muted rounded-full" />
          </Link>
          <Link href="#">
            <Skeleton className="border h-12 aspect-square bg-muted rounded-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}
