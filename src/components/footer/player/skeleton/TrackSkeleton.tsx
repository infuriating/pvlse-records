import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function TrackSkeleton() {
  return (
    <div className="flex relative w-full">
      <Skeleton className="h-20 border aspect-square" />
      <div className="absolute bottom-0 left-24">
        <p className="text-muted-foreground text-[0.65rem]">...</p>
        <p className="text-xl font-bold leading-5">...</p>
        <p className="text-sm">
          <span className="text-muted-foreground">by </span>
          ..., ...
        </p>
      </div>
      <div className="flex gap-x-2 items-center text-xs font-medium">
        <p>00:00</p>
        <div className="w-64">
          <div className="relative w-full bg-muted h-2 rounded-lg transition-all cursor-pointer">
            <div
              style={{ width: `50%` }}
              className="absolute bg-primary z-10 h-2 rounded-lg transition-all"
            />
          </div>
        </div>
        <p>00:00</p>
      </div>
      <div className="flex justify-center items-center left-16 xl:left-0 absolute w-full"></div>
    </div>
  );
}
