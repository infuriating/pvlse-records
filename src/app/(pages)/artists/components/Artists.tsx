"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialIcon from "@/components/SocialIcon";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";

export default function Artists(props: {
  preloadedTasks: Preloaded<typeof api.artists.getAll>;
}) {
  const artists = usePreloadedQuery(props.preloadedTasks);
  if (!artists) return <></>;

  return (
    <div className="place-items-center md:place-items-start px-6 gap-x-6 gap-y-4 grid grid-auto-fit-xl pt-8">
      {artists.map((artist) => {
        return (
          <Card key={artist.name} className="w-96">
            <CardHeader>
              {artist.image ? (
                <Image
                  className="h-32 w-32 rounded-xl object-cover border"
                  src={artist.image}
                  alt={artist.name}
                  width={384}
                  height={384}
                />
              ) : (
                <Skeleton className="h-32 w-32" />
              )}
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl font-bold">{artist.name}</h2>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {artist.description}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/artists/${artist.name}`}>
                <Button className="outline">View more</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
