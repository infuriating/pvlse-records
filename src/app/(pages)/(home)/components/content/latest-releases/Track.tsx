import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Track({
  name,
  artists,
  image,
  url,
}: {
  name: string;
  artists: string[];
  image: string;
  url: string;
}) {
  return (
    <Link href="#">
      <div className="border h-36 aspect-square rounded-lg overflow-hidden">
        {image ? (
          <Image
            src={image}
            height={144}
            width={144}
            alt={name}
            className="object-cover h-full w-full"
          />
        ) : (
          <Skeleton className="bg-muted-foreground h-36 border aspect-square rounded-lg" />
        )}
      </div>
      <p className="font-bold leading-5 pt-1">{name}</p>
      <p className="text-xs text-muted-foreground">
        {artists
          .filter((artist) => artist)
          .map((artist, index, self) => (
            <span key={index}>
              {artist}
              {index !== self.length - 1 && ", "}
            </span>
          ))}
      </p>
    </Link>
  );
}
