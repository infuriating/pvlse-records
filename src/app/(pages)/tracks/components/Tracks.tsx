"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Tracks(params: {
  preloadedTasks: Preloaded<typeof api.tracks.getAll>;
}) {
  const tracks = usePreloadedQuery(params.preloadedTasks);

  return (
    <div className="grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 pt-6 px-8 gap-x-6 gap-y-8">
      {tracks.map((track) => (
        <Link
          className="min-w-60 lg:min-w-72"
          href={`/tracks/${track.title}`}
          key={track.title}
        >
          <div className="bg-primary-foreground rounded-lg p-4">
            <div className="w-full flex justify-center">
              {track.coverImage ? (
                <Image
                  className="h-48 w-48 lg:h-60 lg:w-60 object-cover border"
                  src={track.coverImage}
                  alt={track.title}
                  height={384}
                  width={384}
                />
              ) : (
                <Skeleton className="h-48 w-48 lg:h-60 lg:w-60 border" />
              )}
            </div>

            <p className="mt-2 text-2xl font-bold">{track.title}</p>
            <p className="text-muted-foreground">
              {track.artists
                .filter((artist) => artist)
                .map((artist, index, self) => (
                  <span key={index}>
                    {artist}
                    {index !== self.length - 1 && ", "}
                  </span>
                ))}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
