import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Volume1Icon } from "lucide-react";
import PlayerSkeleton from "./PlayerSkeleton";

export default function FooterTrackSkeleton() {
  return (
    <div className="flex relative w-full">
      <Skeleton className="h-20 border aspect-square" />
      <div className="absolute bottom-0 left-24">
        <p className="text-muted-foreground text-[0.65rem]">...</p>
        <p className="text-xl font-bold leading-5">...</p>
        <p className="text-sm">
          <span className="text-muted-foreground">by </span>...
        </p>
      </div>
      <div className="flex justify-center items-center left-16 xl:left-0 absolute w-full">
        <PlayerSkeleton />
      </div>
      <div className="flex gap-x-2 items-center absolute right-0 bottom-0 h-20">
        <Volume1Icon />
        <Slider className="w-24" defaultValue={[0.1]} max={0.2} step={0.002} />
      </div>
    </div>
  );
}
