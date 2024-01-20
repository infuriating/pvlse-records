"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { api } from "../../../../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function DeleteTrack(props: {
  preloadedTasks: Preloaded<typeof api.tracks.getAll>;
}) {
  const tracks = usePreloadedQuery(props.preloadedTasks);
  if (!tracks) return <></>;

  return (
    <div className="px-6 flex gap-x-6 justify-start pt-8">
      {tracks.map((track) => {
        return (
          <Link
            href={`/dashboard/delete-track/${track.title}`}
            className="p-2 rounded-lg bg-primary-foreground aspect-[1.4/1] min-w-64 max-w-96 flex justify-center items-center flex-col"
            key={track.title}
          >
            <p className="text-xl font-bold">{track.title}</p>
            <div className="flex w-full justify-center">
              <div className="border h-24 xl:h-32 aspect-square rounded-lg overflow-hidden object-cover">
                {track.coverImage ? (
                  <Image
                    src={track.coverImage}
                    alt={track.title}
                    height={384}
                    width={384}
                  />
                ) : (
                  <Skeleton className="h-full" />
                )}
              </div>
            </div>
            <Button variant={"destructive"} className="mt-2">
              Delete Track
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
