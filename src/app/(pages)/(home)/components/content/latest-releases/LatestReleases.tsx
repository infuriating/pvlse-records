"use client";

import React from "react";
import Track from "./Track";
import { usePreloadedQuery, Preloaded } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

export default function LatestReleases(props: {
  preloadedTasks: Preloaded<typeof api.tracks.getLatestFour>;
}) {
  const tracks = usePreloadedQuery(props.preloadedTasks);
  if (!tracks) return <></>;

  const latestTracks = tracks.sort((a, b) => {
    return b._creationTime - a._creationTime;
  });
  const latestFourTracks = latestTracks.slice(0, 4);

  return (
    <div className="pt-8 md:pt-4">
      <p className="text-sm rounded-t-sm px-2 py-1 font-bold bg-primary w-max text-secondary">
        Latest Releases
      </p>
      <div className="grid grid-cols-2 gap-y-6 lg:gap-y-0 lg:grid-cols-4 w-max gap-x-6 p-4 bg-muted rounded-b-md">
        {latestFourTracks.map((track) => {
          return (
            <Track
              key={track._id}
              name={track.title}
              artists={track.artists}
              // @ts-ignore
              image={track.coverImage}
              // @ts-ignore
              url={track.url}
              genre={track.genre}
            />
          );
        })}
      </div>
    </div>
  );
}
