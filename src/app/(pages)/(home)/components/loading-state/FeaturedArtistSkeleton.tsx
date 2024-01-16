"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialIcon from "@/components/SocialIcon";

export default function FeaturedArtistSkeleton() {
  return (
    <div className="grid place-items-center pt-8 md:pt-0 md:place-items-end w-full pr-12">
      <p className="text-sm font-bold">Featured Artist</p>
      <div className="border mt-2 p-4">
        <div className="border h-60 xl:h-96 aspect-square rounded-lg overflow-hidden object-cover">
          <Skeleton className="h-full" />
        </div>
        <p className="font-bold text-lg pt-2 text-center">...</p>
        <div className="flex justify-center gap-x-4 mt-2">
          <SocialIcon social={"..."} />
          <SocialIcon social={"..."} />
          <SocialIcon social={"..."} />
        </div>
      </div>
    </div>
  );
}
