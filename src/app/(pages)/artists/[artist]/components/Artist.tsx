"use client";

import SocialIcon from "@/components/SocialIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import { CardContent, CardFooter, Card } from "@/components/ui/card";

export default function Artist(params: {
  artist: string;
  preloadedTasks: Preloaded<typeof api.artists.getAll>;
  preloadedTracks: Preloaded<typeof api.tracks.getAll>;
}) {
  const artists = usePreloadedQuery(params.preloadedTasks);
  const tracks = usePreloadedQuery(params.preloadedTracks);
  if (!artists) return <></>;

  const artist = artists.find((artist) => artist.name === params.artist);
  if (!artist) return <>Artist not found</>;

  const artistTracks = tracks.filter((track) =>
    track.artists.includes(artist.name)
  );

  return (
    <main className="flex-1 py-6 px-4 md:px-6 mb-24">
      <section className="mb-8">
        <div className="flex items-center space-x-4">
          {artist.image ? (
            <Image
              className="h-24 w-24 rounded-xl object-cover border"
              src={artist.image}
              alt={artist.name}
              height={384}
              width={384}
            />
          ) : (
            <Skeleton className="h-24 w-24" />
          )}
          <div className="flex flex-col w-max gap-y-2 items-center">
            <h2 className="text-2xl font-bold">{artist.name}</h2>
            <div className="flex gap-x-1">
              {artist.socials.map(
                (social) =>
                  social !== "" && (
                    <Link key={social} href={social} target="_blank">
                      <SocialIcon social={social} />
                    </Link>
                  )
              )}
              {artist.spotifyURL && (
                <div className="w-full flex justify-center ">
                  <Link href={artist.spotifyURL} target="_blank">
                    <div className="bg-green-500 hover:bg-green-700 transition-all border h-12 aspect-square rounded-full flex justify-center items-center">
                      <FontAwesomeIcon icon={faSpotify} className="h-8 w-8" />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground max-w-[650px]">
          {artist.description}
        </p>
      </section>

      {artistTracks.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Tracks</h3>
          <div className="grid grid-auto-fit gap-y-4 gap-x-6">
            {artistTracks.map((track) => (
              <Link
                className="max-w-80"
                key={track.title}
                href={`/tracks/${track.title}`}
              >
                <Card>
                  <CardContent className="relative overflow-hidden">
                    {track.coverImage ? (
                      <Image
                        className="h-36 w-36 mt-4"
                        src={track.coverImage}
                        alt={track.title}
                        height={144}
                        width={144}
                      />
                    ) : (
                      <Skeleton className="h-36 w-36 mt-4" />
                    )}
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold leading-4">{track.title}</h3>
                      <p className="text-sm">
                        {track.artists
                          .filter((artist) => artist)
                          .map((artist, index, self) => (
                            <span key={index}>
                              {artist}
                              {index !== self.length - 1 && ", "}
                            </span>
                          ))}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {track.genre.toUpperCase()}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
