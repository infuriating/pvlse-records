import SocialIcon from "@/components/SocialIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { artists } from "@/lib/artists";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page({ params }: { params: { artist: string } }) {
  const artist = artists.find((artist) => artist.name === params.artist);
  if (!artist) return <>Artist not found</>;

  return (
    <div className="flex justify-center pt-12">
      <div
        className="p-2 rounded-lg bg-primary-foreground aspect-[1.4/1] min-w-80 max-w-[500px] flex justify-start items-start flex-col"
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
                src={`/${artist.image}`}
                alt={artist.name}
                height={384}
                width={384}
              />
            ) : (
              <Skeleton className="h-full" />
            )}
          </div>
        </div>
        <div className="w-full flex justify-center gap-x-4 mt-4">
          {artist.socials.map((social) => (
            <Link key={social} href={social} target="_blank">
              <SocialIcon social={social} />
            </Link>
          ))}
        </div>
        {artist.spotifyURL && (
          <div className="w-full flex justify-center mt-4">
            <Link href={artist.spotifyURL} target="_blank">
              <div className="bg-green-500 hover:bg-green-700 transition-all border h-12 aspect-square rounded-full flex justify-center items-center">
                <FontAwesomeIcon icon={faSpotify} className="h-8 w-8" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
