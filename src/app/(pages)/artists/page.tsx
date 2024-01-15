"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { api } from "../../../../convex/_generated/api";

export default function Artists() {
  const artists = useQuery(api.artists.getAll);
  if (!artists) return <></>;

  return (
    <div className="px-6 flex gap-x-6 justify-start pt-8">
      {artists.map((artist) => {
        return (
          <Link
            href={`/artists/${artist.name}`}
            className="p-2 rounded-lg bg-primary-foreground aspect-[1.4/1] min-w-64 max-w-96 flex justify-start items-start flex-col"
            key={artist.name}
          >
            <p className="text-2xl font-bold">{artist.name}</p>
            <p className="pt-1 pb-2 text-muted-foreground text-sm">
              {artist.description}
            </p>
            <div className="flex w-full justify-center">
              <div className="border h-24 xl:h-32 aspect-square rounded-lg overflow-hidden object-cover">
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    height={384}
                    width={384}
                  />
                ) : (
                  <Skeleton className="h-full" />
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
