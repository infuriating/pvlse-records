"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Artist(params: {
  track: string;
  preloadedTracks: Preloaded<typeof api.tracks.getTrack>;
}) {
  const track = usePreloadedQuery(params.preloadedTracks);
  if (!track) return <></>;

  return (
    <main className="flex-1 py-8">
      <section className="mb-8">
        <div className="flex flex-col items-center space-y-4">
          {track.coverImage ? (
            <Image
              alt={track.title}
              src={track.coverImage}
              className="object-cover w-64 h-64 rounded-xl border"
              height={256}
              width={256}
            />
          ) : (
            <Skeleton className="w-64 h-64 rounded-xl border" />
          )}

          <div>
            <h2 className="text-3xl font-bold leading-9">{track.title}</h2>
            <p className="leading-5">
              {track.artists
                .filter((artist) => artist)
                .map((artist, index, self) => (
                  <span key={index}>
                    {artist}
                    {index !== self.length - 1 && ", "}
                  </span>
                ))}
            </p>
            <p className="text-sm text-muted-foreground">
              {track.genre.toUpperCase()}
            </p>
          </div>
        </div>
      </section>
      {track.url && (
        <section className="mb-8 flex justify-center">
          <Link href={track.url} target="_blank">
            <Button className="flex gap-x-2 justify-center bg-green-600 text-white hover:bg-green-700">
              <FontAwesomeIcon icon={faSpotify} className="w-6 h-6" />
              <p className="font-semibold">Listen on Spotify</p>
            </Button>
          </Link>
        </section>
      )}
    </main>
  );
}
