"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { api } from "../../../../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function EditPlayerTracks(props: {
  preloadedTasks: Preloaded<typeof api.playerTracks.getAll>;
}) {
  const playerTracks = usePreloadedQuery(props.preloadedTasks);
  if (!playerTracks) return <></>;

  return (
    <div className="px-6 flex gap-x-6 justify-start pt-8">
      {playerTracks.map((artist) => {
        return (
          <Link
            href={`/dashboard/edit-player-track/${artist.title}`}
            className="p-2 rounded-lg bg-primary-foreground aspect-[1.4/1] min-w-64 max-w-96 flex justify-center items-center flex-col"
            key={artist.title}
          >
            <p className="text-xl font-bold">{artist.title}</p>
            <div className="flex w-full justify-center">
              <div className="border h-24 xl:h-32 aspect-square rounded-lg overflow-hidden object-cover">
                {artist.coverImage ? (
                  <Image
                    src={artist.coverImage}
                    alt={artist.title}
                    height={384}
                    width={384}
                  />
                ) : (
                  <Skeleton className="h-full" />
                )}
              </div>
            </div>
            <Button className="mt-2">Edit Player Track</Button>
          </Link>
        );
      })}
    </div>
  );
}
